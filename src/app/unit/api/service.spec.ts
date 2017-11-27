import { TestBed, inject } from '@angular/core/testing';

import { UnitAPIService } from '@app/unit/api/service';

describe('UnitAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitAPIService]
    });
  });

  it('should be created', inject([UnitAPIService], (service: UnitAPIService) => {
    expect(service).toBeTruthy();
  }));
});
