import { computed, Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo-model';

@Injectable({providedIn: 'root'})
export class TodoService {
  private _todoList = signal<Todo[]>([]);

  public get todoList() {
    return computed(() => this._todoList());
  }

  //Add element to list
  public addToTodoList(todoElement: Todo): void {
    this._todoList.update(todoListItems => [...todoListItems, todoElement])
  }

  //Delete element from list
  public deleteFromTodoList(todoElement: Todo): void {
    this._todoList.update(todoListItems => todoListItems.filter((todo => todo.id !== todoElement.id)));
  }

  //Update element of list
  public updateTodoListElement(todoElement: Todo): void {
    this._todoList.update(todoListItems => todoListItems.map(
      listItem => listItem.id === todoElement.id
        ? {...listItem, isDone: todoElement.isDone, description: todoElement.description}
        : listItem
    ))
  }
}
