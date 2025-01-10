import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './common/confirmation-modal/confirmation-modal.component';
import { ListComponent } from './pages/list/list.component';
import { TodoElementComponent } from './pages/todo-element/todo-element.component';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent,
    ListComponent,
    TodoElementComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
    MatSidenavContent,
    MatSidenavContainer,
    MatSidenav,
    MatButtonModule,
    MatIcon,
    MatToolbar,
    MatCard,
    MatCardContent,
    MatSlideToggle,
    MatFormFieldModule,
    MatInput,
    MatSelect,
    MatOption,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatPaginator,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
