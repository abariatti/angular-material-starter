import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemePickerModule } from './shared/theme-picker';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private _translate: TranslateService,
    private _element: ElementRef,
    private _overlayContainer: OverlayContainer
  ) {        
    _translate.setDefaultLang('en');
  }

  ngOnInit(){
  
  }
  
  onSetStyle(event){
    this._element.nativeElement.className = "";
    this._overlayContainer.getContainerElement().className = "";
    this._element.nativeElement.classList.add(event);
    this._overlayContainer.getContainerElement().classList.add(event);
  }
}
