import { UnitConversionModule } from './unit-conversion.module';

describe('UnitConversionModule', () => {
  let unitConversionModule: UnitConversionModule;

  beforeEach(() => {
    unitConversionModule = new UnitConversionModule();
  });

  it('should create an instance', () => {
    expect(unitConversionModule).toBeTruthy();
  });
});
