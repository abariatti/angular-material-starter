import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  Output,
  EventEmitter,
  ApplicationRef,
  OnInit
} from '@angular/core';
import {ThemeStorage, DocsSiteTheme} from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemePickerService } from './theme-picker.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {
  themes: DocsSiteTheme[];
  currentTheme$: Observable<DocsSiteTheme>;

  constructor(private themePickerService: ThemePickerService) {
    this.themes = this.themePickerService.themes;
    this.currentTheme$ = this.themePickerService.theme$;
  }

  installTheme(theme: DocsSiteTheme) {
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
