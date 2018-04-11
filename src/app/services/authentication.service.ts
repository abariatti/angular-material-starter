﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get<any>('/parse/login', { params: { username: username, password: password } })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.sessionToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // call api
    this.http.post<any>('/parse/logout', {})
      .map(() => {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      });
  }

  me() {
    // check authentication
    return this.http.get<any>('/parse/users/me')
      .map(user => {
        return user;
      })
      .catch(err => {
        localStorage.removeItem('currentUser');
        throw(err);
      });
  }

  register(registerModel: any) {
    return this.http.post<any>('/parse/users', registerModel);
  }
}
