import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { TodoService } from '../../services/todo-service';
import { Todo } from '../../models/todo-model';
import { Router } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-todo-element',
  standalone: false,

  templateUrl: './todo-element.component.html',
  styleUrl: './todo-element.component.scss'
})
export class TodoElementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private router = inject(Router);

  public isEditByNavigation: Todo | undefined = this.router.getCurrentNavigation()?.extras.state?.['data'];
  public todoItemFrom = this.fb.group({
    id: new FormControl(uuid.v4()),
    description: new FormControl<string>('', [Validators.required]),
    isDone: new FormControl<boolean>(false, {nonNullable: true}),
  })

  ngOnInit(): void {
    if (this.isEditByNavigation) {
      this.todoItemFrom.setValue(this.isEditByNavigation)
    }
  }


  // Submit form and save new or edited data and reset data to default state
  public onSubmit(formDirective: FormGroupDirective): void {
    const formValue = this.todoItemFrom.value;
    if (this.isEditByNavigation) {
      this.todoService.updateTodoListElement(formValue as Todo)
      this.router.navigate(['/']);
    } else {
      this.todoService.addToTodoList(formValue as Todo);
      formDirective.resetForm({id: uuid.v4()});
    }
  }

}
