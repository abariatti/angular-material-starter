import {Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, Output, EventEmitter} from '@angular/core';
import {ThemeStorage, DocsSiteTheme} from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'aria-hidden': 'true'},
})
export class ThemePicker {
  @Output() setStyle: EventEmitter<String> = new EventEmitter();

  themes = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      class: 'pink-blue-grey-theme',
      isDark: false,
      href: ''
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      class: 'pink-blue-grey-theme',
      isDark: false,
      isDefault: true,
      href: ''
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      class: 'pink-blue-grey-theme',
      isDark: true,
      href: ''
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      class: 'pink-blue-grey-theme',
      isDark: true,
      href: ''
    },
  ];
  currentTheme;
  defaultTheme;
  constructor(
    private _themeStorage: ThemeStorage
  ) {
    this.currentTheme = this._themeStorage.getStoredTheme();
    this.defaultTheme = this.themes.find(theme => theme.isDefault);
  }

  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromClass(theme.class);
    this.setStyle.emit(theme.class);
    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromClass(className: string): DocsSiteTheme {
    return this.themes.find(theme => theme.class === className);
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
  exports: [ThemePicker],
  declarations: [ThemePicker],
  providers: [ThemeStorage],
})
export class ThemePickerModule { }
