import { ConverterModule } from '@app/converter/module';

describe('ConverterModule', () => {
  let converterModule: ConverterModule;

  beforeEach(() => {
    converterModule = new ConverterModule();
  });

  it('should create an instance', () => {
    expect(converterModule).toBeTruthy();
  });
});
