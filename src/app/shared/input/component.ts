import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { Calc, IInput } from '@app/calculator/models';
import { IUnit } from '@app/unit/models';

@Component({
  selector: 'dc-input',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
  @Input() input: IInput;
  @Output() unitChange: EventEmitter<IUnit> = new EventEmitter<IUnit>();
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  // get showUnitOptions(): boolean { return this.input && this.input.group.length > 1; }

  constructor() { }

  ngOnInit() { }

  // getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];
  onUnitChange = (unit: IUnit): void => this.unitChange.emit(unit);
  onValueChange = (value: number): void => this.valueChange.emit(value);
}