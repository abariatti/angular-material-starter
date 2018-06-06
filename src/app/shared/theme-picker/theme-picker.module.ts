import { MatButtonModule, MatIconModule, MatMenuModule, MatGridListModule, MatTooltipModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker';
import { ThemeStorage } from './theme-storage/theme-storage';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [ThemeStorage],
})
export class ThemePickerModule {  }
