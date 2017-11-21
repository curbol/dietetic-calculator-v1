import { TestBed, inject } from '@angular/core/testing';
import { CalcAPIActions } from '@app/calculator/api/actions';

describe('CalcAPIActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcAPIActions]
    });
  });

  it('should be created', inject([CalcAPIActions], (service: CalcAPIActions) => {
    expect(service).toBeTruthy();
  }));
});
