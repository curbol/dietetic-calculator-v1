import { TestBed, inject } from '@angular/core/testing';
import { CalcAPIEpics } from '@app/calculator/api/epics';

describe('CalcAPIEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcAPIEpics]
    });
  });

  it('should be created', inject([CalcAPIEpics], (service: CalcAPIEpics) => {
    expect(service).toBeTruthy();
  }));
});
