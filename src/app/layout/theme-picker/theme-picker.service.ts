// src/app/timer/timer.service.ts
import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeStorage } from './theme-storage/theme-storage';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationThemes } from './application-themes.enum';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root',
})
export class ThemePickerService {

  public themes: Theme[] = ApplicationThemes;
  private themeSource = new BehaviorSubject<Theme>(this.themes.find(theme => theme.isDefault));
  private element: ElementRef;
  private overlayContainer: OverlayContainer;

  public theme$ = this.themeSource.asObservable();

  constructor(private themeStorage: ThemeStorage) {
    this.theme$.subscribe(t => {
      if (this.element && this.overlayContainer) {
        this.themes.forEach(theme => {
          if (this.element.nativeElement.classList.contains(theme.class)) {
            this.element.nativeElement.classList.remove(theme.class);
          }
          if (this.overlayContainer.getContainerElement().classList.contains(theme.class)) {
            this.overlayContainer.getContainerElement().classList.remove(theme.class);
          }
        });

        this.element.nativeElement.classList.add(t.class);
        this.overlayContainer.getContainerElement().classList.add(t.class);
      }
    });
  }

  public installTheme(theme: Theme): void {
    this.themeSource.next(theme);
    this.themeStorage.storeTheme(theme);
  }

  public register(element: ElementRef, overlayContainer: OverlayContainer): void {
    this.element = element;
    this.overlayContainer = overlayContainer;

    this.themeSource.next(this.themeStorage.getStoredTheme() ||
    this.themes.filter(t => t.isDefault)[0]);
  }
}
