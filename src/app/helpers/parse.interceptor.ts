import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ParseInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available
    const applicationId = 'ANGULAR_MATERIAL_STARTER';
    const restApiKey = undefined;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    request = request.clone({
      setHeaders: {
        'X-Parse-Application-Id': applicationId
      }
    });

    if (restApiKey) {
      request = request.clone({
        setHeaders: {
          'X-Parse-REST-API-Key': restApiKey
        }
      });
    }

    if (currentUser && currentUser.sessionToken) {
      request = request.clone({
        setHeaders: {
          'X-Parse-Session-Token': currentUser.sessionToken
        }
      });
    }


    return next.handle(request).do((event: HttpEvent<any>) => {
      // success
    }, (err: any) => {
      // error
      if (err instanceof HttpErrorResponse) {
        this.alertService.error(err.message);
        if (err.status === 401) {
          // redirect to the login route
          this.router.navigate(['login']);
        }
      }
    });
  }
}
