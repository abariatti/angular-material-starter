import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { map, flatMap, switchMap, merge } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  private currentUser;
  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

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
    this.removeLocalUser();
    // call api
    this.http.post<any>('/parse/logout', {});
  }

  me(): Observable<any> {
    // best version we return cached but in the same time we check with our backend
    if (!this.currentUser) {
      // we dont have a current user it ends here
      return Observable.of(undefined);
    }
    // we have a current user so we return it first
    // so it is immediately displayed
    return Observable.of(this.currentUser)
      // ... but our user might not be authenticated anymore
      // so we check with our backend if we have it we just
      // update it (send a new value to our observable)
      .pipe(merge(this.http.get('/parse/users/me').catch(err => {
        // in this case our user is not authenticated anymore
        // we remove it from local storage and reset our cache
        this.removeLocalUser();
        return Observable.of(undefined);
      })));

    // simple version
    // return this.http.get('/parse/users/me');

    // cache only version
    // return Observable.of(this.currentUser);
  }

  register(registerModel: any) {
    return this.http.post<any>('/parse/users', registerModel);
  }

  private removeLocalUser() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser');
  }
}
