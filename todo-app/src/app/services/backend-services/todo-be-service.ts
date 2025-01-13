import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../models/todo-model';

@Injectable({providedIn: 'root'})
export class TodoBeService {
  private http = inject(HttpClient);


  /**
   * Get todo list items to backend
   */
  /*
  public getTodoList() {
    return this.http.get('/rest/exampleService/list');
  }
   */

  /**
   * Save todo list items to backend
   */
  public postTodoList(todolist: Todo[]) {
    return this.http.post('/rest/exampleService/save', todolist);
  }
}
