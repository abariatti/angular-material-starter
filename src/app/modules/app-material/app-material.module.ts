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
         MatSnackBarModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatExpansionModule,
         MatNativeDateModule,
         MatDatepickerModule } from '@angular/material';

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
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class AppMaterialModule { }
