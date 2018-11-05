import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ScanComponent } from './scan/scan.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'prefix' },
  { path: 'start', component: StartComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerExampleRoutingModule { }
