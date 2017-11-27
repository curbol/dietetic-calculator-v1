import { TestBed, inject } from '@angular/core/testing';
import { CalcActions } from '@app/calculator/state/actions';

describe('CalcAPIActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcActions]
    });
  });

  it('should be created', inject([CalcActions], (service: CalcActions) => {
    expect(service).toBeTruthy();
  }));
});
