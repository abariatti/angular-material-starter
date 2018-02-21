import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ThemeStorage, DocsSiteTheme } from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';

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

  currentTheme;
  defaultTheme;

  themes:DocsSiteTheme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      class: 'deep-purple-amber-theme',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      class: 'indigo-pink-theme',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      class: 'pink-blue-grey-theme',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      class: 'purple-green-theme',
      isDark: true,
    },
  ];

  constructor(private _themeStorage: ThemeStorage) {  
    this.currentTheme = this._themeStorage.getStoredTheme();
    this.defaultTheme = this.themes.find(theme => theme.isDefault)    
  }

  ngOnInit(){
    this.installTheme(this.currentTheme || this.defaultTheme);
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
