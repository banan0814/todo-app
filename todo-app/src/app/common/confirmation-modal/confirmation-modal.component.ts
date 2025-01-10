import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/confirmation-dialog-data';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);
  readonly confirm = model(this.data.confirm);
}
