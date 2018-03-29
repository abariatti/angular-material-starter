import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(user: User) {
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
      try {
        this.userService.delete(user.id).subscribe(
          success => {  },
          error => {
            this.alertService.error(error);
            this.loadAllUsers();
          }
        );
      } catch (ex) {
        this.alertService.error(ex);
        this.loadAllUsers();
      }
  }

  private loadAllUsers() {
      this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
