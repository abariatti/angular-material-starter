import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() menuClicked = new EventEmitter<void>();

  constructor() { }

  clickMenu() {
    this.menuClicked.emit();
  }
}