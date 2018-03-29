import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeUserBackendInterceptor } from './fake-user-backend-interceptor';

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeUserBackendInterceptor,
  multi: true
};
