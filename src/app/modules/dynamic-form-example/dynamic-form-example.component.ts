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

  public formModel: DynamicFormControlModel[] = MATERIAL_SAMPLE_FORM_MODEL;
  public formGroup: FormGroup;

  constructor(
    private dynamicFormService: DynamicFormService,
    private dynamicFormExampleService: DynamicFormExampleService
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.dynamicFormService
      .createFormGroup(this.dynamicFormExampleService.getForm());
  }

  public onBlur($event): void {
    console.debug(`Material blur event on: ${$event.model.id}: `, $event);
  }

  public onChange($event): void {
    console.debug(`Material change event on: ${$event.model.id}: `, $event);
  }

  public onFocus($event): void {
    console.debug(`Material focus event on: ${$event.model.id}: `, $event);
  }

  public onMatEvent($event): void {
    console.debug(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
  }

  public onSubmit(): void {
    console.debug(this.formGroup.value);
  }
}
