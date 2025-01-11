import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { Todo } from '../../models/todo-model';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-edit-modal',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogContent
  ],
  templateUrl: './todo-edit-modal.component.html',
  styleUrl: './todo-edit-modal.component.scss'
})
export class TodoEditModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  readonly dialogRef = inject(MatDialogRef<TodoEditModalComponent>);
  readonly data: Todo = inject<Todo>(MAT_DIALOG_DATA);

  public todoItemFrom = this.fb.group({
    id: new FormControl(uuid.v4()),
    description: new FormControl<string>('', [Validators.required]),
    isDone: new FormControl<boolean>(false, {nonNullable: true}),
  })

  ngOnInit(): void {
    if (this.data) {
      this.todoItemFrom.setValue(this.data)
    }
  }

  // Submit form and save new or edited data and reset data to default state
  public onSubmit(): void {
    const formValue = this.todoItemFrom.value;
    if (this.data) {
      this.todoService.updateTodoListElement(formValue as Todo)
      this.dialogRef.close();
    } else {
      this.todoService.addToTodoList(formValue as Todo);
      this.dialogRef.close();
    }
  }
}
