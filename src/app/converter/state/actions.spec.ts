import { TestBed, inject } from '@angular/core/testing';

import { ConverterActions } from '@app/converter/state/actions';

describe('ConverterActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConverterActions]
    });
  });

  it('should be created', inject([ConverterActions], (service: ConverterActions) => {
    expect(service).toBeTruthy();
  }));
});
