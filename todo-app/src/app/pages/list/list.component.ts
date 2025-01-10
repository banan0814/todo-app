import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Todo } from '../../models/todo-model';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private todoListService = inject(TodoService);
  private router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private _pageIndex: number = 0;
  private _pageSize: number = 10;
  private startIndex: number = 0;
  private endIndex: number = ((this._pageIndex + 1) * this._pageSize);

  public completeList = this.todoListService.todoList;
  public filteredList = signal<Todo[]>(this.completeList());
  public paginatedView: Todo[] = this.paginateListData();
  public listElementState = new FormControl(null);
  public listElementDescription = new FormControl('');
  public selectOptions: { value: boolean | null, viewValue: string }[] = [
    {value: null, viewValue: 'Összes'},
    {value: true, viewValue: 'Kész'},
    {value: false, viewValue: 'Nincs kész'},
  ];

  get pageSize(): number {
    return this._pageSize;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  ngOnInit(): void {
    this.listElementDescription.valueChanges.subscribe(() => this.search());
  }

  // Delete element and update search list if needed
  private deleteElement(todo: Todo) {
    this.todoListService.deleteFromTodoList(todo);
    this.search();
  }

  // Slice up list to paginate
  private paginateListData(): Todo[] {
    this.startIndex = ((this._pageIndex + 1) * this._pageSize) - this._pageSize;
    this.endIndex = ((this._pageIndex + 1) * this._pageSize);
    return this.filteredList().slice(this.startIndex, this.endIndex)
  }

  //Update element state
  public updateTodoDoneState(todo: Todo, isChecked: MatSlideToggleChange): void {
    this.todoListService.updateTodoListElement({
      description: todo.description,
      isDone: isChecked.checked,
      id: todo.id
    });
    this.search();
  }

  // Call confirmation modal for delete
  public confirmDelete(todo: Todo) {
    const confirm = signal(true);
    // The following two lines are here because of an angular known issue https://github.com/angular/components/issues/30187
    // seems related to how aria-hidden is applied to the background content while the dialog is active
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Elem törlése',
        description: `Biztosan törölni szeretné a(z) \"${todo.description}\" elemet?`,
        confirm: confirm()
      },
    });

    dialogRef.afterClosed().subscribe((result: any): void => {
      if (result) {
        this.deleteElement(todo);
      }
    });
  }

  //Edit element by using the todo-element component
  public navigateToEdit(todo: Todo): void {
    const navigationExtras: NavigationExtras = {state: {data: todo}};
    this.router.navigate(['/todo-edit'], navigationExtras);
  }

  //Search by Description and by State the filters can apply azt he same time.
  // Update pagination if needed
  public search(): void {
    const searchByDescription =
      (item: Todo): boolean => item.description.includes(this.listElementDescription.value!);
    const searchByState =
      (item: Todo): boolean => {
        return item.isDone === this.listElementState.value;
      }
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

    const updatedPageIndex = this.filteredList().length <= this.startIndex ? 0 : this._pageIndex;
    if (updatedPageIndex !== this.pageIndex) {
      this.handlePageEvent({
        pageIndex: updatedPageIndex,
        pageSize: this._pageSize,
        length: this.filteredList().length
      })
    }
  }

  public handlePageEvent(event: PageEvent): void {
    this._pageSize = event.pageSize;
    this._pageIndex = event.pageIndex;
    this.paginatedView = this.paginateListData();
  }
}
