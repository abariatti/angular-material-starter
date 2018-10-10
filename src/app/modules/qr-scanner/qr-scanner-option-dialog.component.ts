import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScannerData } from '../../models/scanner-data';

@Component({
  selector: 'app-qr-scanner-option-dialog',
  templateUrl: 'qr-scanner-option-dialog.component.html',
})
export class QrScannerOptionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<QrScannerOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScannerData
  ) { }

  public onCameraChanged: EventEmitter<MediaDeviceInfo> = new EventEmitter();

  public onDeviceSelectChange(device: MediaDeviceInfo): void {
    this.onCameraChanged.emit(device);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public displayCameras(cameras: MediaDeviceInfo[]): void {
    this.data.availableDevices = cameras;
  }

  public stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }
}
