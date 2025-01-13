import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoElementComponent } from './todo-element.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoElementComponent', () => {
  let component: TodoElementComponent;
  let fixture: ComponentFixture<TodoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoElementComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Unit Tests
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty description', () => {
    expect(component.todoItemFrom.controls['description'].value).toBe('');
  });

  it('should mark the form as invalid if description is empty', () => {
    component.todoItemFrom.controls['description'].setValue('');
    expect(component.todoItemFrom.invalid).toBeTrue();
  });

  it('should mark the form as valid if description is filled', () => {
    component.todoItemFrom.controls['description'].setValue('Test description');
    expect(component.todoItemFrom.valid).toBeTrue();
  });

  it('should call onSubmit when form is valid and submitted', () => {
    component.todoItemFrom.controls['description'].setValue('Test description');
    const formDirective = jasmine.createSpyObj('FormGroupDirective', ['resetForm']);

    component.onSubmit(formDirective);
    expect(formDirective.resetForm).toHaveBeenCalled();
  });

  // Integration Tests
  it('should render the form with required fields', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    const inputElement = formElement.query(By.css('input[formControlName="description"]'));
    const buttonElement = formElement.query(By.css('button[type="submit"]'));

    expect(inputElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.todoItemFrom.controls['description'].setValue('');
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.todoItemFrom.controls['description'].setValue('Valid description');
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(buttonElement.disabled).toBeFalse();
  });

  it('should display the correct button text based on isEditByNavigation', () => {
    component.isEditByNavigation = {id: '1', description: 'Test Todo', isDone: false};
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Elem szerkesztése');

    component.isEditByNavigation = undefined;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Hozzáadás a listához');
  });

  it('should show an error message if the description field is touched and invalid', () => {
    const descriptionControl = component.todoItemFrom.controls['description'];
    descriptionControl.setValue('');
    descriptionControl.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe('A mező kitöltése kötelező');
  });
});
