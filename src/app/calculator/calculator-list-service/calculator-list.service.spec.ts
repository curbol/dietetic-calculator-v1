import { TestBed, inject } from '@angular/core/testing';

import { CalculatorListService } from './calculator-list.service';

describe('CalculatorListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorListService]
    });
  });

  it('should be created', inject([CalculatorListService], (service: CalculatorListService) => {
    expect(service).toBeTruthy();
  }));
});
