import { TestBed, inject } from '@angular/core/testing';

import { EquationService } from '@app/equation/service';

describe('EquationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquationService]
    });
  });

  it('should be created', inject([EquationService], (service: EquationService) => {
    expect(service).toBeTruthy();
  }));
});
