import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { Calc } from '@app/calculator/calc';
import { Unit } from '@app/unit/unit';

@Component({
  selector: 'dc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
  @Input() input: Calc.Input;
  @Output() unitChange: EventEmitter<Unit.Unit> = new EventEmitter<Unit.Unit>();
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  get showUnitOptions(): boolean { return this.input && this.input.group.length > 1; }

  constructor() { }

  ngOnInit() { }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
  onUnitChange = (unit: Unit.Unit): void => this.unitChange.emit(unit);
  onValueChange = (value: number): void => this.valueChange.emit(value);
}
