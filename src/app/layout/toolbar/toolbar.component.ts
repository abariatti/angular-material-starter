import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() menuClicked = new EventEmitter<void>();
  public user: User;

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.me().subscribe(u => this.user = u);
  }

  clickMenu() {
    this.menuClicked.emit();
  }
}
