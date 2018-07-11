import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemePickerService } from '../theme-picker/theme-picker.service';

@Component({
  selector: 'app-pages-nav',
  templateUrl: './pages-nav.component.html',
  styleUrls: ['./pages-nav.component.scss']
})
export class PagesNavComponent implements OnInit {
  public isDarkTheme = false;

  constructor(private themePickerService: ThemePickerService) {
    this.themePickerService.theme$.subscribe(t => {
      this.isDarkTheme = t.isDark;
    });
  }

  ngOnInit() {

  }

}
