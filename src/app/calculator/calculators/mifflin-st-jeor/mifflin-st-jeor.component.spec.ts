import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MifflinStJeorComponent } from './mifflin-st-jeor.component';

describe('MifflinStJeorComponent', () => {
  let component: MifflinStJeorComponent;
  let fixture: ComponentFixture<MifflinStJeorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MifflinStJeorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MifflinStJeorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
