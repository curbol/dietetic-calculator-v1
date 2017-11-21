import { TestBed, inject } from '@angular/core/testing';

import { CalcAPIService } from './service';

describe('CalcAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcAPIService]
    });
  });

  it('should be created', inject([CalcAPIService], (service: CalcAPIService) => {
    expect(service).toBeTruthy();
  }));
});
