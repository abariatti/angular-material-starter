import { DynamicFormExampleModule } from './dynamic-form-example.module';

describe('DynamicFormExampleModule', () => {
  let dynamicFormExampleModule: DynamicFormExampleModule;

  beforeEach(() => {
    dynamicFormExampleModule = new DynamicFormExampleModule();
  });

  it('should create an instance', () => {
    expect(dynamicFormExampleModule).toBeTruthy();
  });
});
