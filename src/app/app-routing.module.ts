import { PagesNavComponent } from './layout/pages-nav/pages-nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: PagesNavComponent,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'products', loadChildren: './modules/product/product.module#ProductModule' },
      { path: 'dynamic-form-example', loadChildren: './modules/dynamic-form-example/dynamic-form-example.module#DynamicFormExampleModule' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
