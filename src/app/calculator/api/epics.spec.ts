import { TestBed, inject } from '@angular/core/testing';
import { CalcApiEpics } from '@app/calculator/api/epics';

describe('CalcApiEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcApiEpics]
    });
  });

  it('should be created', inject([CalcApiEpics], (service: CalcApiEpics) => {
    expect(service).toBeTruthy();
  }));
});
