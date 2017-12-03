import { TestBed, inject } from '@angular/core/testing';

import { ConverterEpics } from '@app/converter/state/epics';

describe('ConverterEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConverterEpics]
    });
  });

  it('should be created', inject([ConverterEpics], (service: ConverterEpics) => {
    expect(service).toBeTruthy();
  }));
});
