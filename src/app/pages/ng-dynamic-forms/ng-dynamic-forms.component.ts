import { NgDynamicFormsService } from './ng-dynamic-forms.service';
import { Component, OnInit } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ng-dynamic-forms',
  templateUrl: './ng-dynamic-forms.component.html',
  styleUrls: ['./ng-dynamic-forms.component.scss']
})
export class NgDynamicFormsComponent implements OnInit {

  formModel: DynamicFormControlModel[];
  formGroup: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private ngDynamicFormsService: NgDynamicFormsService
  ) { }

  ngOnInit() {
    this.formModel = this.ngDynamicFormsService.getForm();
    this.formGroup = this.dynamicFormService.createFormGroup(this.formModel);
  }

}
