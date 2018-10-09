import {Injectable, EventEmitter} from '@angular/core';
import { Theme } from '../theme';

@Injectable()
export class ThemeStorage {
  private static storageKey = 'docs-theme-storage-current';

  public onThemeUpdate: EventEmitter<Theme> = new EventEmitter<Theme>();

  public storeTheme(theme: Theme): void {
    try {
      window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    } finally {
      this.onThemeUpdate.emit(theme);
    }
  }

  public getStoredTheme(): Theme {
    try {
      return JSON.parse(window.localStorage[ThemeStorage.storageKey] || undefined);
    } catch (e) {
      return undefined;
    }
  }

  public clearStorage(): void {
    window.localStorage.removeItem(ThemeStorage.storageKey);
  }
}
