import { Component, ElementRef, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private element: ElementRef,
    private overlayContainer: OverlayContainer,
    private themePickerService: ThemePickerService,
    private swUpdate: SwUpdate
  ) {
    this.translate.setDefaultLang('en');
    this.themePickerService.register(this.element, this.overlayContainer);
  }

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('A new version is available. Load?')) {
          window.location.reload();
        }
      });
    }
  }
}
