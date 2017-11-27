import { TestBed, inject } from '@angular/core/testing';
import { CalcEpics } from '@app/calculator/state/epics';

describe('CalcAPIEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcEpics]
    });
  });

  it('should be created', inject([CalcEpics], (service: CalcEpics) => {
    expect(service).toBeTruthy();
  }));
});
