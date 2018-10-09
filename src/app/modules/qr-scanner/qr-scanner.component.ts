import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  public ngVersion = VERSION.full;

  @ViewChild('scanner')
  public scanner: ZXingScannerComponent;

  public hasPermission: boolean;
  public hasDevices: boolean;
  public qrResultString: string;
  public qrResult: Result;
  public availableDevices: MediaDeviceInfo[];
  public currentDevice: MediaDeviceInfo;

  public ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => this.chooseDevice(devices));
    this.scanner.hasDevices.subscribe((has: boolean) => this.hasDevices = has);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  public displayCameras(cameras: MediaDeviceInfo[]): void {
    this.availableDevices = cameras;
  }

  public handleQrCodeResult(resultString: string): void {
    this.qrResultString = resultString;
  }

  public onDeviceSelectChange(selectedValue: string): void {
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
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

  private chooseDevice(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    // selects the device's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.scanner.changeDevice(device);
        this.currentDevice = device;
        break;
      }
    }
    // no back device selected taking first available
    if (!this.currentDevice && devices.length > 0) {
      this.scanner.changeDevice(devices[0]);
      this.currentDevice = devices[0];
    }
  }

}
