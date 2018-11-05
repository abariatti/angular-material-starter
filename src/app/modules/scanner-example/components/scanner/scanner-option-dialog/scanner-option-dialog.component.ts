import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { ScannerData } from '../models/scanner-data';

@Component({
  selector: 'app-scanner-option-dialog',
  templateUrl: 'scanner-option-dialog.component.html',
  styleUrls: ['./scanner-option-dialog.scss']
})
export class ScannerOptionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ScannerOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScannerData
  ) { }

  public onCameraChanged: EventEmitter<string> = new EventEmitter();

  public onDeviceSelectChange(event: MatRadioChange): void {
    this.onCameraChanged.emit(event.value ? event.value.deviceId : undefined);
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
