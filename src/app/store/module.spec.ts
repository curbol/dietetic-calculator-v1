import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { TestBed, async, getTestBed } from '@angular/core/testing';

import { StoreModule } from './module';
import { RootEpics } from '@app/store/epics';

describe('StoreModule', () => {
  let mockNgRedux: NgRedux<any>;
  let devTools: DevToolsExtension;
  let mockEpics: RootEpics;
  let storeModule: StoreModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgReduxTestingModule ],
    }).compileComponents().then(() => {
      const testbed = getTestBed();

      mockEpics = { createEpics() { return []; } } as RootEpics;

      devTools = testbed.get(DevToolsExtension);
      mockNgRedux = MockNgRedux.getInstance();
    });

    storeModule = new StoreModule(mockNgRedux, devTools, null, mockEpics);
  }));

  it('should create an instance', () => {
    expect(storeModule).toBeTruthy();
  });

  it('should configure the store when the module is loaded', async(() => {
    const configureSpy = spyOn(MockNgRedux.getInstance(), 'configureStore');
    const instance = new StoreModule(mockNgRedux, devTools, null, mockEpics);

    expect(configureSpy).toHaveBeenCalled();
  }));
});
