import { AppMaterialModule } from './../app-material/app-material.module';
import { QrScannerOptionDialogComponent } from './qr-scanner-option-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { QrScannerRoutingModule } from './qr-scanner-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    QrScannerRoutingModule,
    ZXingScannerModule,
    AppMaterialModule
  ],
  declarations: [
    QrScannerComponent,
    QrScannerOptionDialogComponent
  ],
  entryComponents: [
    QrScannerOptionDialogComponent
  ]
})
export class QrScannerModule { }
