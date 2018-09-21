import { catchError } from 'rxjs/operators/catchError';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, merge } from 'rxjs/operators';
import { User } from '../models/user';
import { of } from 'rxjs';


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get<any>('/parse/login', { params: { username: username, password: password } })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.sessionToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    this.removeLocalUser();
    // call api
    this.http.post<any>('/parse/logout', {});
  }

  me(): Observable<User> {
    // best version we return cached but in the same time we check with our backend
    if (!JSON.parse(localStorage.getItem('currentUser'))) {
      // we dont have a current user it ends here
      return of(undefined);
    }
    // we have a current user so we return it first
    // so it is immediately displayed
    return of(JSON.parse(localStorage.getItem('currentUser')))
      // ... but our user might not be authenticated anymore
      // so we check with our backend if we have it we just
      // update it (send a new value to our observable)
      .pipe(merge(this.http.get('/parse/users/me').pipe(catchError(err => {
        // in this case our user is not authenticated anymore
        // we remove it from local storage and reset our cache
        this.removeLocalUser();
        return of(undefined);
      }))));

    // simple version
    // return this.http.get('/parse/users/me');

    // cache only version
    // return Observable.of(this.currentUser);
  }

  register(registerModel: any) {
    return this.http.post<any>('/parse/users', registerModel);
  }

  private removeLocalUser() {
    localStorage.removeItem('currentUser');
  }
}
