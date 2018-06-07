import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { ThemePickerEvent } from './shared/theme-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private element: ElementRef,
    private overlayContainer: OverlayContainer
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {

  }

  onSetStyle(event: ThemePickerEvent) {
    this.element.nativeElement.classList.remove(event.removeClass);
    this.element.nativeElement.classList.add(event.addClass);
    this.overlayContainer.getContainerElement().classList.add(event.removeClass);
    this.overlayContainer.getContainerElement().classList.add(event.addClass);
  }
}
