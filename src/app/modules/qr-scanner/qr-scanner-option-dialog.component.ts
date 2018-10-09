import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QRScannerData } from './qr-scanner-data.model';

@Component({
  selector: 'app-qr-scanner-option-dialog',
  templateUrl: 'qr-scanner-option-dialog.component.html',
})
export class QrScannerOptionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<QrScannerOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QRScannerData) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
