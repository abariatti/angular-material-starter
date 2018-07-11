import { Component, ElementRef, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor( private translate: TranslateService,
    private element: ElementRef,
    private overlayContainer: OverlayContainer,
    private themePickerService: ThemePickerService
  ) {
    this.translate.setDefaultLang('en');
    this.themePickerService.register(this.element, this.overlayContainer);
  }

  ngOnInit() {  }
}
