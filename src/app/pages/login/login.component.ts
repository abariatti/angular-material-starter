import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { NgForm, FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginModel: User = new User();
  registerModel: any = {};
  loading = false;
  returnUrl: string;
  selectedIndex: Number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginModel.email, this.loginModel.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  register(fregister: NgForm) {
    console.log(fregister);
    this.loading = true;
    this.userService.create(this.registerModel)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.loginModel.email = this.registerModel.email;
          this.selectedIndex = 0;
          fregister.resetForm();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
