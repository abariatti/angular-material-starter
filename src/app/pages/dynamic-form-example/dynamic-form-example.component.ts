import { DynamicFormExampleService } from './dynamic-form-example.service';
import { Component, OnInit } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html',
  styleUrls: ['./dynamic-form-example.component.scss']
})
export class DynamicFormExampleComponent implements OnInit {

  formModel: DynamicFormControlModel[];
  formGroup: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private dynamicFormExampleService: DynamicFormExampleService
  ) { }

  ngOnInit() {
    this.formModel = this.dynamicFormExampleService.getForm();
    this.formGroup = this.dynamicFormService.createFormGroup(this.formModel);
  }

}
