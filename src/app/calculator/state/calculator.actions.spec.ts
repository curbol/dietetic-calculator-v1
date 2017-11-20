import { TestBed, inject } from '@angular/core/testing';

import { CalculatorActions } from './calculator.actions';

describe('CalculatorActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorActions]
    });
  });

  it('should be created', inject([CalculatorActions], (service: CalculatorActions) => {
    expect(service).toBeTruthy();
  }));
});
