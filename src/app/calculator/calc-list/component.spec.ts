import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcListComponent } from './calc-list.component';

describe('CalcListComponent', () => {
  let component: CalcListComponent;
  let fixture: ComponentFixture<CalcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
