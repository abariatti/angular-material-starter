import { Result } from '@zxing/library';

export class QRScannerData {
  public hasPermission: boolean;
  public hasDevices: boolean;
  public qrResultString: string;
  public qrResult: Result;
  public availableDevices: MediaDeviceInfo[];
  public currentDevice: MediaDeviceInfo;
}
