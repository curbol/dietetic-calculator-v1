import { TestBed, inject } from '@angular/core/testing';
import { CalcApiActions } from '@app/calculator/api/actions';

describe('CalcApiActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcApiActions]
    });
  });

  it('should be created', inject([CalcApiActions], (service: CalcApiActions) => {
    expect(service).toBeTruthy();
  }));
});
