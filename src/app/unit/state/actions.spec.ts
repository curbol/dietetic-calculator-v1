import { TestBed, inject } from '@angular/core/testing';

import { UnitActions } from '@app/unit/state/actions';

describe('UnitActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitActions]
    });
  });

  it('should be created', inject([UnitActions], (service: UnitActions) => {
    expect(service).toBeTruthy();
  }));
});
