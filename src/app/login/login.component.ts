import { Register } from './../models/register';
import { Login } from './../models/login';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { NgForm, FormGroup, FormControlName } from '@angular/forms';

export const returnUrl = 'returnUrl';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginModel: Login = new Login();
  public registerModel: Register = new Register();
  public loading = false;
  public returnUrl: string;
  public selectedIndex: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) { }

  public ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[returnUrl] || '/';
  }

  public login(): void {
    this.loading = true;
    this.authenticationService.login(this.loginModel.username, this.loginModel.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        });
  }

  public register(fregister: NgForm): void {
    this.loading = true;
    this.registerModel.username = this.registerModel.email;
    this.authenticationService.register(this.registerModel)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.loginModel.username = this.registerModel.email;
          this.selectedIndex = 0;
          fregister.resetForm();
        });
  }
}
