import { ParseInterceptor } from './helpers/parse.interceptor';
import { ProductService } from './services/product.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ProductComponent } from './pages/product/product.component';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { PagesNavComponent } from './layout/pages-nav/pages-nav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SideMenuItemsComponent } from './layout/side-menu-items/side-menu-items.component';
import { ThemePickerModule } from './layout/theme-picker';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PagesNavComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    ProductComponent,
    ToolbarComponent,
    SideMenuItemsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsMaterialUIModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ThemePickerModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    ProductService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ParseInterceptor,
        multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
