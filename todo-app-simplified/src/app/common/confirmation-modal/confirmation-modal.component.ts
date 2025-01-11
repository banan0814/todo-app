import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/confirmation-dialog-data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirmation-modal.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);
  readonly confirm = model(this.data.confirm);
}
