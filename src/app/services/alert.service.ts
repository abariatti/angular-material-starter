import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router, private snackBar: MatSnackBar) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    public success(message: string, keepAfterNavigationChange = false): void {
        this.snackBar.open(message, 'Ok', {
          duration: 2000,
        });
    }

    public error(message: string, keepAfterNavigationChange = true): void {
        this.snackBar.open(message, 'Ok');
    }
}
