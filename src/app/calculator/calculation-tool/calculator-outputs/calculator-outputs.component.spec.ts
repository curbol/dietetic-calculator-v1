import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorOutputsComponent } from './calculator-outputs.component';

describe('CalculatorOutputsComponent', () => {
  let component: CalculatorOutputsComponent;
  let fixture: ComponentFixture<CalculatorOutputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorOutputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
