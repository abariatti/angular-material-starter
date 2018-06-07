import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  Output,
  EventEmitter,
  ApplicationRef
} from '@angular/core';
import {ThemeStorage, DocsSiteTheme} from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {
  @Output() setStyle: EventEmitter<ThemePickerEvent> = new EventEmitter();

  themes = [
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
  currentTheme;
  defaultTheme;
  appInstance;

  constructor(
    private themeStorage: ThemeStorage,
    private overlayContainer: OverlayContainer,
    private applicationRef: ApplicationRef
  ) {
    this.currentTheme = this.themeStorage.getStoredTheme();
    this.defaultTheme = this.themes.find(theme => theme.isDefault);
  }

  installTheme(theme: DocsSiteTheme) {
    this.setStyle.emit({addClass: theme.class, removeClass: this.currentTheme.class});
    this.currentTheme = this.getCurrentThemeFromClass(theme.class);
    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  private getCurrentThemeFromClass(className: string): DocsSiteTheme {
    return this.themes.find(theme => theme.class === className);
  }

}

export class ThemePickerEvent {
  addClass: string;
  removeClass: string;
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
