import { DynamicFormExampleComponent } from './dynamic-form-example.component';
import { DynamicFormExampleService } from './dynamic-form-example.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormExampleRoutingModule } from './dynamic-form-example-routing.module';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    DynamicFormExampleRoutingModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsMaterialUIModule,
  ],
  declarations: [
    DynamicFormExampleComponent
  ],
  providers: [
    DynamicFormExampleService
  ]
})
export class DynamicFormExampleModule { }
