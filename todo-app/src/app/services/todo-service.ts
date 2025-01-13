import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo-model';
import { TodoBeService } from './backend-services/todo-be-service';

@Injectable({providedIn: 'root'})
export class TodoService {
  private _todoList = signal<Todo[]>([]);
  private todoBeService = inject(TodoBeService);

  public get todoList() {
    return computed(() => this._todoList());
  }

  /**
   *   Add element to list
   *   @param todoElement
   */
  public addToTodoList(todoElement: Todo): void {
    this._todoList.update(todoListItems => [...todoListItems, todoElement])
  }

  /**
   * Delete element from list
   * @param todoElement
   */
  public deleteFromTodoList(todoElement: Todo): void {
    this._todoList.update(todoListItems => todoListItems.filter((todo => todo.id !== todoElement.id)));
  }

  /**
   * Update element of list
   * @param todoElement
   */
  public updateTodoListElement(todoElement: Todo): void {
    this._todoList.update(todoListItems => todoListItems.map(
      listItem => listItem.id === todoElement.id
        ? {...listItem, isDone: todoElement.isDone, description: todoElement.description}
        : listItem
    ))
  }

  /**
   * Posts list to BE
   * (Not in use in the absence of further specification)
   * @private
   */
  private saveTodoListToBe() {
    this.todoBeService.postTodoList(this._todoList());
  }
}
