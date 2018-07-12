import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { ThemeStorage } from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import { ThemePickerService } from './theme-picker.service';
import { Theme } from './theme';


@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {
  themes: Theme[];
  currentTheme: Theme;

  constructor(private themePickerService: ThemePickerService) {
    this.themes = this.themePickerService.themes;
    this.themePickerService.theme$.subscribe(t => {
      this.currentTheme = t;
    });
  }

  installTheme(theme: Theme) {
    this.themePickerService.installTheme(theme);
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    CommonModule
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [ThemeStorage],
})
export class ThemePickerModule { }
