import { Injectable } from '@angular/core';
import {
  DynamicFormControlModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicFormGroupModel
} from '@ng-dynamic-forms/core';

@Injectable()
export class DynamicFormExampleService {

  constructor() { }

  getForm(): DynamicFormControlModel[] {
    const form: DynamicFormControlModel[] = [

      new DynamicInputModel({

        id: 'sampleInput',
        label: 'Sample Input',
        maxLength: 42,
        placeholder: 'Sample input'
      }),

      new DynamicRadioGroupModel<string>({

        id: 'sampleRadioGroup',
        label: 'Sample Radio Group',
        options: [
          {
            label: 'Option 1',
            value: 'option-1',
          },
          {
            label: 'Option 2',
            value: 'option-2'
          },
          {
            label: 'Option 3',
            value: 'option-3'
          }
        ],
        value: 'option-3'
      }),

      new DynamicCheckboxModel({

        id: 'sampleCheckbox',
        label: 'I do agree'
      }),

      new DynamicFormGroupModel({

        id: 'fullName',
        legend: 'Name',
        group: [
          new DynamicInputModel({

            id: 'firstName',
            label: 'First Name'
          }),
          new DynamicInputModel({

            id: 'lastName',
            label: 'Last Name'
          })
        ]
      }),

      new DynamicFormGroupModel({

        id: 'address',
        legend: 'Address',
        group: [
          new DynamicInputModel({

            id: 'street',
            label: 'street'
          }),
          new DynamicInputModel({

            id: 'zipCode',
            label: 'Zip Code'
          })
        ]
      })
    ];

    return form;
  }

}
