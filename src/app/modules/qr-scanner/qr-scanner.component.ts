
import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatDialog } from '@angular/material';
import { QrScannerOptionDialogComponent } from './qr-scanner-option-dialog.component';
import { ScannerData } from '../../models/scanner-data';

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
  public scannerData: ScannerData = new ScannerData();

  public ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => this.chooseDevice(devices));
    this.scanner.hasDevices.subscribe((has: boolean) => this.scannerData.hasDevices = has);
    this.scanner.scanComplete.subscribe((result: Result) => this.scannerData.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.scannerData.hasPermission = perm);
  }

  public handleQrCodeResult(resultString: string): void {
    this.scannerData.qrResultString = resultString;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(QrScannerOptionDialogComponent, {
      width: '250px',
      data: this.scannerData
    });

    const cameraChangedSubscription = dialogRef.componentInstance
      .onCameraChanged.subscribe(deviceId => this.onDeviceSelectChange(deviceId));

    dialogRef.afterClosed().subscribe(result => {
      cameraChangedSubscription.unsubscribe();
    });
  }

  public onDeviceSelectChange(selectedValue: string): void {
    this.scannerData.currentDevice = this.scanner.getDeviceById(selectedValue);
    this.setDevice(this.scannerData.currentDevice);
  }

  private chooseDevice(devices: MediaDeviceInfo[]): void {
    this.scannerData.availableDevices = devices;
    // selects the device's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.setDevice(device);
        break;
      }
    }
    // no back device selected taking first available
    if (!this.scannerData.currentDevice && devices.length > 0) {
      this.setDevice(devices[0]);
    }
  }

  private setDevice(device: MediaDeviceInfo): void {
    this.scanner.changeDevice(device);
    this.scannerData.currentDevice = device;
  }

}
