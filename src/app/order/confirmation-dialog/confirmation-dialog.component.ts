import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  public deleteMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private service: OrderService,
  ) {}

  // Building this dialog solely for cancellation flow, just as a small demo
  // In a production app expected to grow, this dialog would be templatized and
  // reusable for the entire app using a content interface, but kept it small for time
  public cancelOrder(): void {
    this.service.cancelOrder(this.data).subscribe({
      next: ({ message }) => this.deleteMessage = message,
      error: error => {
        console.warn(error);
        this.deleteMessage = 'Failed to delete due to the following error: ' + error;
      },
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
