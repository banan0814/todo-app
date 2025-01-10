import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { TodoElementComponent } from './pages/todo-element/todo-element.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "todo-edit",
    component: TodoElementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
