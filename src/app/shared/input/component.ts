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
  @Input() readonly: boolean;
  @Input() name: string;
  @Input() units: IUnit[];
  @Input() unitSymbol: string;
  @Output() unitSymbolChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  get selectedUnit(): IUnit { return this.units ? this.units.find(u => u.symbol === this.unitSymbol) : null; }

  constructor() { }

  ngOnInit() { }

  showUnitOptions = () => this.units && this.units.length > 1;

  onSelectedUnitChange = (symbol: string): void => this.unitSymbolChange.emit(symbol);
  onValueChange = (value: number): void => {
    if (this.value !== value) { this.valueChange.emit(value); }
  }
}
