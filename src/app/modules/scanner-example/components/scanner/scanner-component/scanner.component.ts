
import {interval as observableInterval,  Observable } from 'rxjs';

import {finalize, map, take} from 'rxjs/operators';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { ScannerData } from '../models/scanner-data';
import { ScannerOptionDialogComponent } from '../scanner-option-dialog/scanner-option-dialog.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  public scanning = false;
  public countDown: Observable<number>;
  @Input()
  public scanTimeout = 5;
  @Output()
  public scan: EventEmitter<string> = new EventEmitter();
  @Output()
  public timeout: EventEmitter<void> = new EventEmitter();
  @ViewChild('scanner')
  public scanner: ZXingScannerComponent;
  public scannerData: ScannerData = new ScannerData();
  public ttl: number;

  constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    const timeout = this.scanTimeout;
    observableInterval(1000).pipe(take(timeout),
    map(i => timeout - i),
    finalize(() => {
      this.ttl = undefined;
      this.timeout.emit();
    }), )
    .subscribe(i => {
      this.ttl = i - 1;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ScannerOptionDialogComponent, {
      width: '350px',
      data: this.scannerData
    });

    const cameraChangedSubscription = dialogRef.componentInstance
      .onCameraChanged.subscribe(deviceId => this.onDeviceSelectChange(deviceId));

    dialogRef.afterClosed().subscribe(result => {
      cameraChangedSubscription.unsubscribe();
    });
  }

  public onDeviceSelectChange(deviceId: string): void {
    this.scannerData.currentDevice = this.scanner.getDeviceById(deviceId);
  }

  public onScanSuccess(result: Result): void {
    this.scan.emit(result.toString());
  }

  public onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.scannerData.availableDevices = devices;
    // selects the device's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.scannerData.currentDevice = device;
        break;
      }
    }
    // no back device selected taking first available
    if (!this.scannerData.currentDevice && devices.length > 0) {
      this.scannerData.currentDevice = devices[0];
    }
  }

  public onPermissionResponse(perm: boolean): void {
    this.scannerData.hasPermission = perm;
  }

  public onHasDevices(has: boolean): void {
    this.scannerData.hasDevices = has;
  }

}
