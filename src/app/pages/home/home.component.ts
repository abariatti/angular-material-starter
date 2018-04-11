import { AuthenticationService } from './../../services/authentication.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.authenticationService.me().subscribe(user => {
        this.currentUser = user;
      });
    }
  }
}
