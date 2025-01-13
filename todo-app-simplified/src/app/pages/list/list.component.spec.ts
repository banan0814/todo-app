import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ListComponent } from './list.component';
import { TodoService } from '../../services/todo-service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        ListComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should interact with the private service', () => {
    const todoService = TestBed.inject(TodoService);
    const todo = {id: '1', description: 'Test Todo', isDone: false};

    spyOn(todoService, 'updateTodoListElement').and.callThrough();
    component.updateTodoDoneState(todo, {checked: true} as MatSlideToggleChange);

    expect(todoService.updateTodoListElement).toHaveBeenCalled();
  });

  it('should filter the list based on status', () => {
    component.selectOptions = [
      {value: null, viewValue: 'Összes'},
      {value: true, viewValue: 'Kész'},
      {value: false, viewValue: 'Nincs kész'}
    ];
    component.listElementState.setValue(true);
    component.search();
    fixture.detectChanges();
    expect(component.filteredList()).toEqual(component.completeList().filter(todo => todo.isDone = true));
  });

  it('should filter the list based on description', () => {
    component.listElementDescription.setValue('test');
    component.search();
    fixture.detectChanges();
    expect(component.filteredList()).toEqual(component.completeList().filter(todo => todo.description.includes('test')));
  });

  it('should toggle the done state of a todo', () => {
    const todoService = TestBed.inject(TodoService);
    todoService.addToTodoList({id: '1', description: 'Test Todo', isDone: false});
    const todo = {id: '1', description: 'Test Todo', isDone: false};
    component.updateTodoDoneState(todo, {checked: true} as MatSlideToggleChange);
    component.search();
    expect(component.filteredList()[0].isDone).toBeTrue();
  });

  it('should call confirmDelete when delete button is clicked', fakeAsync(() => {
    spyOn(component, 'confirmDelete');

    //Prepare list to have element and the expected button
    component.completeList().length = 5;
    component.filteredList.update(() => Array.from({length: 5}, (_, i) => ({
      id: i.toString(),
      description: `Item ${i}`,
      isDone: false
    })));
    component.paginatedView.update(() => component.filteredList());
    fixture.detectChanges();
    flush();

    const button = fixture.debugElement.nativeElement.querySelector('#confirmDelete');
    button.click();
    expect(component.confirmDelete).toHaveBeenCalled();
  }));

  it('should call editButton when edit button is clicked', fakeAsync(() => {
    spyOn(component, 'addOrEditNew');

    //Prepare list to have element and the expected button
    component.completeList().length = 5;
    component.filteredList.update(() => Array.from({length: 5}, (_, i) => ({
      id: i.toString(),
      description: `Item ${i}`,
      isDone: false
    })));
    component.paginatedView.update(() => component.filteredList());
    fixture.detectChanges();
    flush();

    const button = fixture.debugElement.nativeElement.querySelector('#editButton');
    button.click();
    expect(component.addOrEditNew).toHaveBeenCalled();
  }));


  it('should handle pagination correctly', () => {
    component.filteredList.update(() => Array.from({length: 15}, (_, i) => ({
      id: i.toString(),
      description: `Item ${i}`,
      isDone: false
    })));
    const pageEvent = {pageIndex: 1, pageSize: 5, length: 15};
    component.handlePageEvent(pageEvent);

    expect(component['pageIndex']).toBe(1);
    expect(component['pageSize']).toBe(5);
    expect(component.paginatedView.length).toBeLessThanOrEqual(5);
    // Ellenőrzi, hogy az aktuális oldal első eleme helyes
    expect(component.paginatedView()[0].id).toBe('5');
  });
});
