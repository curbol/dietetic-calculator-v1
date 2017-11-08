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

  constructor() { }

  ngOnInit() { }

  getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
  onUnitChange = (unit: Unit.Unit): void => this.unitChange.emit(unit);
}
