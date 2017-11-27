import { TestBed, inject } from '@angular/core/testing';

import { UnitEpics } from './epics';

describe('UnitEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitEpics]
    });
  });

  it('should be created', inject([UnitEpics], (service: UnitEpics) => {
    expect(service).toBeTruthy();
  }));
});
