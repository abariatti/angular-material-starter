import {Injectable, EventEmitter} from '@angular/core';
import { Theme } from '../theme';

@Injectable()
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current';

  onThemeUpdate: EventEmitter<Theme> = new EventEmitter<Theme>();

  storeTheme(theme: Theme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    } catch (e) { }

    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): Theme {
    try {
      return JSON.parse(window.localStorage[ThemeStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) { }
  }
}
