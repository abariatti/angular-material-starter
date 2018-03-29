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
export class FakeUserBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: User[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return Observable.of(null).mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        const filteredUsers = users.filter(user => {
          return user.email === request.body.email && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: 'fake-jwt-token'
          };

          return Observable.of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return Observable.throw('Username or password is incorrect');
        }
      }

      // get users
      if (request.url.endsWith('/api/users') && request.method === 'GET') {
        console.log('get');
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return Observable.of(new HttpResponse({ status: 200, body: users }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // get user by id
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          const matchedUsers = users.filter(u => { return u.id === id; });
          const user = matchedUsers.length ? matchedUsers[0] : null;

          return Observable.of(new HttpResponse({ status: 200, body: user }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // create user
      if (request.url.endsWith('/api/users') && request.method === 'POST') {
        // get new user object from post body
        const newUser = request.body;

        // validation
        const duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
        if (duplicateUser) {
          return Observable.throw('Username "' + newUser.email + '" is already taken');
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }

      // delete user
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
        console.log('delete');
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          let found = false;
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              found = true;
              break;
            }
          }
          if (!found) {
            return Observable.throw('Unknown user id: ' + id);
          }
          // respond 200 OK
          return Observable.of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    })

      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
