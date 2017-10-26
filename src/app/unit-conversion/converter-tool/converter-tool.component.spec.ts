import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterToolComponent } from './converter-tool.component';

describe('ConverterToolComponent', () => {
  let component: ConverterToolComponent;
  let fixture: ComponentFixture<ConverterToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConverterToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
