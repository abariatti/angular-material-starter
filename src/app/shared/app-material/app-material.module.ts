import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCardModule,
         MatCheckboxModule,
         MatDialogModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatSelectModule,
         MatSidenavModule,
         MatSlideToggleModule,
         MatTabsModule,
         MatToolbarModule,
         MatGridListModule,
         MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSnackBarModule
  ]
})
export class AppMaterialModule { }
