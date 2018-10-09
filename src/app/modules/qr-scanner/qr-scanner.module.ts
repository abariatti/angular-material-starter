import { AppMaterialModule } from './../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { QrScannerRoutingModule } from './qr-scanner-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    QrScannerRoutingModule,
    ZXingScannerModule,
    AppMaterialModule
  ],
  declarations: [QrScannerComponent]
})
export class QrScannerModule { }
