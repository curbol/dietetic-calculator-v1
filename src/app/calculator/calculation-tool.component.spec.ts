import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationToolComponent } from './calculation-tool.component';

describe('CalculationToolComponent', () => {
  let component: CalculationToolComponent;
  let fixture: ComponentFixture<CalculationToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
