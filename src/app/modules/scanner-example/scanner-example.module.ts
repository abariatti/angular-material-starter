import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result/result.component';
import { StartComponent } from './start/start.component';
import { ScanComponent } from './scan/scan.component';
import { ScannerComponent } from './components/scanner/scanner-component/scanner.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerOptionDialogComponent } from './components/scanner/scanner-option-dialog/scanner-option-dialog.component';
import { FormsModule } from '@angular/forms';
import { ScannerExampleRoutingModule } from './scanner-example-routing.module';

@NgModule({
  imports: [
    ScannerExampleRoutingModule,
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ZXingScannerModule.forRoot(),
  ],
  declarations: [
    ScannerComponent,
    ScannerOptionDialogComponent,
    StartComponent,
    ScanComponent,
    ResultComponent
  ],
  entryComponents: [
    ScannerOptionDialogComponent
  ]
})
export class ScannerExampleModule { }
