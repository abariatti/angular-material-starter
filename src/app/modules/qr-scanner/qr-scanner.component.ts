import { QRScannerData } from './qr-scanner-data.model';
import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatDialog } from '@angular/material';
import { QrScannerOptionDialogComponent } from './qr-scanner-option-dialog.component';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  public ngVersion = VERSION.full;

  @ViewChild('scanner')
  public scanner: ZXingScannerComponent;

  private qrScannerData: QRScannerData = new QRScannerData();

  public ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => this.chooseDevice(devices));
    this.scanner.hasDevices.subscribe((has: boolean) => this.qrScannerData.hasDevices = has);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrScannerData.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.qrScannerData.hasPermission = perm);
  }

  public displayCameras(cameras: MediaDeviceInfo[]): void {
    this.qrScannerData.availableDevices = cameras;
  }

  public handleQrCodeResult(resultString: string): void {
    this.qrScannerData.qrResultString = resultString;
  }

  public onDeviceSelectChange(selectedValue: string): void {
    this.qrScannerData.currentDevice = this.scanner.getDeviceById(selectedValue);
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

  public openDialog(): void {
    const dialogRef = this.dialog.open(QrScannerOptionDialogComponent, {
      width: '250px',
      data: this.qrScannerData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.qrScannerData = result;
      this.setDevice(this.qrScannerData.currentDevice);
    });
  }

  private chooseDevice(devices: MediaDeviceInfo[]): void {
    this.qrScannerData.availableDevices = devices;
    // selects the device's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.setDevice(device);
        break;
      }
    }
    // no back device selected taking first available
    if (!this.qrScannerData.currentDevice && devices.length > 0) {
      this.setDevice(devices[0]);
    }
  }

  private setDevice(device: MediaDeviceInfo): void {
    this.scanner.changeDevice(device);
    this.qrScannerData.currentDevice = device;
  }

}
