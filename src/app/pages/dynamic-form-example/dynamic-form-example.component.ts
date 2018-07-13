import { DynamicFormExampleService } from './dynamic-form-example.service';
import { Component, OnInit, AfterViewInit, DoCheck, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html',
  styleUrls: ['./dynamic-form-example.component.scss']
})
export class DynamicFormExampleComponent implements OnInit, AfterViewInit, DoCheck {

  formModel: DynamicFormControlModel[];
  formGroup: FormGroup;

  private differ: any;

  constructor(
    private dynamicFormService: DynamicFormService,
    private dynamicFormExampleService: DynamicFormExampleService,
    private changeDetectorRef: ChangeDetectorRef,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
    this.formModel = this.dynamicFormExampleService.getForm();
    this.formGroup = this.dynamicFormService.createFormGroup(this.formModel);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngDoCheck() {
    const change = this.differ.diff(this.formModel);
    if (change) {
      this.formGroup = this.dynamicFormService.createFormGroup(this.formModel);
      this.changeDetectorRef.detectChanges();
    }
  }

  onSubmit() {
    console.log(this.formModel);
    console.log(this.formGroup);
  }
}
