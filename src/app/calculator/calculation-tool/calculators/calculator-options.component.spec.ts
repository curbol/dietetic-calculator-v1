import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorOptionsComponent } from './calculator-options.component';

describe('CalculatorOptionsComponent', () => {
  let component: CalculatorOptionsComponent;
  let fixture: ComponentFixture<CalculatorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
