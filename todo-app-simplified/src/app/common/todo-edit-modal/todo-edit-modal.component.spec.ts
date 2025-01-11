import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditModalComponent } from './todo-edit-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('TodoEditModalComponent', () => {
  let fixture: ComponentFixture<TodoEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule, TodoEditModalComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: undefined},
        {provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close'])}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditModalComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
