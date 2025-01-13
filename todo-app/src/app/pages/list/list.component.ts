import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from '../../models/todo-model';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';
import { TodoService } from '../../services/todo-service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly todoListService = inject(TodoService);
  private readonly doc = inject(DOCUMENT);
  private readonly dialog = inject(MatDialog);
  private subscriptions: Subscription = new Subscription();
  protected pageIndex: number = 0;
  protected pageSize: number = 10;
  protected startIndex: number = 0;
  protected endIndex: number = ((this.pageIndex + 1) * this.pageSize);

  public completeList = this.todoListService.todoList;
  public filteredList = signal<Todo[]>(this.completeList());
  public paginatedView = signal<Todo[]>(this.filteredList());
  public listElementState: FormControl<boolean | null> = new FormControl(null);
  public listElementDescription: FormControl<string | null> = new FormControl('');
  public selectOptions: { value: boolean | null, viewValue: string }[] = [
    {value: null, viewValue: 'Összes'},
    {value: true, viewValue: 'Kész'},
    {value: false, viewValue: 'Nincs kész'},
  ];

  ngOnInit(): void {
    this.subscriptions.add(this.listElementDescription.valueChanges.subscribe(() => this.search()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Delete element and update search list if needed
   * @param todo
   * @private
   */
  private deleteElement(todo: Todo) {
    this.todoListService.deleteFromTodoList(todo);
    this.search();
  }

  /**
   * Slice up list to paginate
   * @private
   */
  private paginateListData(): void {
    this.startIndex = ((this.pageIndex + 1) * this.pageSize) - this.pageSize;
    this.endIndex = ((this.pageIndex + 1) * this.pageSize);
    this.paginatedView.update(() => this.filteredList().slice(this.startIndex, this.endIndex));
  }

  /**
   * Update element state
   * @param todo
   * @param isChecked
   */
  public updateTodoDoneState(todo: Todo, isChecked: MatSlideToggleChange): void {
    this.todoListService.updateTodoListElement({
      description: todo.description,
      isDone: isChecked.checked,
      id: todo.id
    });
    this.search();
  }

  /**
   * Call confirmation modal for delete
   * @param todo
   */
  public confirmDelete(todo: Todo) {
    /*
    The following two lines are here because of an angular known issue https://github.com/angular/components/issues/30187
    seems related to how aria-hidden is applied to the background content while the dialog is active
     */
    const buttonElement = this.doc.activeElement as HTMLElement;
    buttonElement.blur();

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Elem törlése',
        description: `Biztosan törölni szeretné a(z) \"${todo.description}\" elemet?`,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean): void => {
      if (result) {
        this.deleteElement(todo);
      }
    });
  }

  /**
   * Search by Description and by State the filters can apply azt he same time.
   * Update pagination if needed
   */
  public search(): void {
    const searchByDescription: (item: Todo) => boolean =
      (item: Todo): boolean => item.description.includes(this.listElementDescription.value!);
    const searchByState: (item: Todo) => boolean =
      (item: Todo): boolean => item.isDone === this.listElementState.value;
    const descInput: string | null = this.listElementDescription.value;
    const stateInputHasValue: boolean = this.listElementState.value !== null;

    this.filteredList.update(() => this.completeList().filter(item =>
      stateInputHasValue && descInput
        ? searchByState(item) && searchByDescription(item)
        : stateInputHasValue
          ? searchByState(item)
          : descInput
            ? searchByDescription(item)
            : item));

    const updatedPageIndex = this.filteredList().length <= this.startIndex ? 0 : this.pageIndex;
    if (updatedPageIndex !== this.pageIndex) {
      this.handlePageEvent({
        pageIndex: updatedPageIndex,
        pageSize: this.pageSize,
        length: this.filteredList().length
      })
    } else {
      this.paginateListData();
    }
  }

  /**
   * Page event handler method, updated page index and size and call paginate
   * @param event
   */
  public handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateListData();
  }
}
