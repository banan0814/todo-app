import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let component: ConfirmationModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      imports: [BrowserAnimationsModule, MatDialogModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {title: 'Confirm', description: 'Are you sure?'}},
        {provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close'])}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the title and description', () => {
    const dialogElement: HTMLElement = fixture.nativeElement;
    const title = dialogElement.querySelector('h2[mat-dialog-title]');
    const description = dialogElement.querySelector('mat-dialog-content p');

    expect(title?.textContent).toBe('Confirm');
    expect(description?.textContent).toBe('Are you sure?');
  });
});
