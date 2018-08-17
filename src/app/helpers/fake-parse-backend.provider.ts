import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeParseUserBackendInterceptor } from './fake-parse-user-backend-interceptor';

export let fakeParseBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeParseUserBackendInterceptor,
  multi: true
};
