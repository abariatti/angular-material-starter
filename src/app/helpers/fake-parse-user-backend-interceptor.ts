import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { User } from '../models/user';

@Injectable()
export class FakeParseUserBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: User[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {

      // login
      if (request.url.endsWith('/parse/login') && request.method === 'GET') {
        // find if any user matches login credentials
        const filteredUsers = users.filter(user => {
          return user.username === request.params.get('username') && user.password === request.params.get('password');
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            sessionToken: 'fake-jwt-token-for:' + user.id
          };

          return Observable.of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return Observable.throw('Username or password is incorrect');
        }
      }

      // me
      if (request.url.endsWith('/parse/users/me') && request.method === 'GET') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('x-parse-session-token').startsWith('fake-jwt-token-for:')) {
          // retrieve user id in the token
          const userId = parseInt(request.headers.get('x-parse-session-token').split(':')[1], 10);
          // retrieve user from cache
          const user = users.find(u => u.id === userId);

          return Observable.of(new HttpResponse({ status: 200, body: user }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // create user
      if (request.url.endsWith('/parse/users') && request.method === 'POST') {
        // get new user object from post body
        const newUser: User = request.body;
        newUser.isAdmin = false;
        // validation
        const duplicateUser = users.filter(user => user.username === newUser.username).length;
        if (duplicateUser) {
          return Observable.throw('Username "' + newUser.username + '" is already taken');
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }

       // GET Products
       if (request.url.endsWith('/parse/classes/products') && request.method === 'GET') {

      }


      // pass through any requests not handled above
      return next.handle(request);

    })

      // call materialize and dematerialize to ensure delay even if an error is thrown
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
