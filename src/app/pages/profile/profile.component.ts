import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser: any = {};
  constructor(private authenticationService: AuthenticationService) { }

  public ngOnInit(): void {
    this.authenticationService.me().subscribe(user => {
      this.currentUser = user;
    });
  }
}
