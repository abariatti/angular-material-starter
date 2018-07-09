import { ThemePickerService } from './shared/theme-picker/theme-picker.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';

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
    this.themePickerService.theme$.subscribe(t => {
      this.themePickerService.themes.forEach(theme => {
        if (this.element.nativeElement.classList.contains(theme.class)) {
          this.element.nativeElement.classList.remove(theme.class);
        }
        if (this.overlayContainer.getContainerElement().classList.contains(theme.class)) {
          this.overlayContainer.getContainerElement().classList.remove(theme.class);
        }
      });
      this.element.nativeElement.classList.add(t.class);
      this.overlayContainer.getContainerElement().classList.add(t.class);
    });
  }

  ngOnInit() {  }
}
