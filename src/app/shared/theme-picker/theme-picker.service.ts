// src/app/timer/timer.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { DocsSiteTheme, ThemeStorage } from './theme-storage/theme-storage';

@Injectable({
  providedIn: 'root',
})
export class ThemePickerService {

  public themes: DocsSiteTheme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      class: 'deep-purple-amber-theme',
      isDark: false,
      href: ''
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      class: 'indigo-pink-theme',
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
      class: 'purple-green-theme',
      isDark: true,
      href: ''
    },
  ];
  private themeSource = new BehaviorSubject<DocsSiteTheme>(this.themes.find(theme => theme.isDefault));
  public theme$ = this.themeSource.asObservable();

  constructor(private themeStorage: ThemeStorage) {
    this.themeSource.next(this.themeStorage.getStoredTheme());
  }

  public installTheme(theme: DocsSiteTheme) {
    this.themeSource.next(theme);
    this.themeStorage.storeTheme(theme);
  }
}
