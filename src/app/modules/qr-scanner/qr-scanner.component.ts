import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  ngOnInit(): void {

    // this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
    //     this.availableDevices = devices;

    //     // selects the devices's back camera by default
    //     for (const device of devices) {
    //         if (/back|rear|environment/gi.test(device.label)) {
    //             this.scanner.changeDevice(device);
    //             this.currentDevice = device;
    //             break;
    //         }
    //     }
    // });

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => this.availableDevices = devices);
    this.scanner.hasDevices.subscribe((has: boolean) => this.hasDevices = has);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }

  stateToEmoji(state: boolean): string {

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
