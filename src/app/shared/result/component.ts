import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Num } from '@app/shared/num';
import { IUnit } from '@app/unit/models';
import { UnitAPIService } from '@app/unit/api/service';

@Component({
  selector: 'dc-result',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class ResultComponent implements OnInit {
  // defaultUnit: IUnit;
  // selectedUnit: IUnit;
  // unitGroup: IUnit[];

  // @Input() title: string;
  // @Input() value: number;
  // @Input() symbolText: string;
  // @Input() symbol: Unit.Symbol;

  // private _convertSymbol: Unit.Symbol;
  // get convertSymbol(): Unit.Symbol { return this._convertSymbol; }
  // @Input() set convertSymbol(value: Unit.Symbol) {
  //   this._convertSymbol = value;
  //   this.convertSymbolChange.emit(value);
  //   this.selectedUnit = this.getUpdatedSelectedUnit(value);
  // }
  // @Output() convertSymbolChange: EventEmitter<Unit.Symbol> = new EventEmitter<Unit.Symbol>();

  // get convertedValue(): number {
  //   if (!this.defaultUnit || !this.selectedUnit) { return this.value; }
  //   return Unit.conversion(this.defaultUnit.factor)(this.selectedUnit.factor)(this.value);
  // }

  // get showUnitOptions(): boolean { return this.selectedUnit && this.unitGroup.length > 1; }

  constructor(private unitService: UnitAPIService) { }

  ngOnInit() {
    // this.setDefaultValues(this.symbol);
  }

  // getUpdatedSelectedUnit = (symbol: Unit.Symbol): Unit.Unit => {
  //   if (symbol === null || symbol === undefined) { return; }

  //   this.unitService.getUnit(symbol)
  //   .then((unit: IUnit) => {
  //     return this.unitService.getUnitsOfType(unit.type.id);
  //   }).then((unitsOfType: IUnit[]) => {
  //     this.selectedUnit = unitsOfType.find(u => u.symbol === symbol) || this.defaultUnit;
  //   });
  // }

  // setDefaultValues = (symbol: Unit.Symbol): void => {
  //   if (symbol === null || symbol === undefined) { return; }

  //   this.unitService.getUnit(symbol)
  //   .then((unit: IUnit) => {
  //     this.defaultUnit = unit;
  //     return this.unitService.getUnitsOfType(unit.type.id);
  //   }).then((unitsOfType: IUnit[]) => {
  //     this.unitGroup = unitsOfType;
  //     this.selectedUnit = unitsOfType.find(u => u.symbol === this.convertSymbol) || this.defaultUnit;
  //   });
  // }

  // getUnitString = (symbol: Unit.Symbol): string => Unit.Symbol[symbol];

  // onUnitChange = (unit: IUnit) => {
  //   if (this.selectedUnit && Unit.Symbol[this.selectedUnit.symbol]) {
  //     this.convertSymbol = this.selectedUnit.symbol;
  //   }
  // }
}
