import { DynamicFormExampleService } from './dynamic-form-example.service';
import { Component, OnInit, AfterViewInit, DoCheck, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { MATERIAL_SAMPLE_FORM_MODEL } from './material-sample-form-model';

@Component({
  selector: 'app-dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html',
  styleUrls: ['./dynamic-form-example.component.scss']
})
export class DynamicFormExampleComponent implements OnInit {

  formModel: DynamicFormControlModel[] = MATERIAL_SAMPLE_FORM_MODEL;
  formGroup: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private dynamicFormExampleService: DynamicFormExampleService
  ) { }

  ngOnInit() {
    this.formGroup = this.dynamicFormService
      .createFormGroup(this.dynamicFormExampleService.getForm());
  }

  onBlur($event) {
    console.log(`Material blur event on: ${$event.model.id}: `, $event);
  }

  onChange($event) {
      console.log(`Material change event on: ${$event.model.id}: `, $event);
  }

  onFocus($event) {
      console.log(`Material focus event on: ${$event.model.id}: `, $event);
  }

  onMatEvent($event) {
      console.log(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
