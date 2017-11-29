import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { IUnit } from '@app/unit/models';
import { CalcAPIService } from '@app/calculator/api/service';
import { UnitAPIService } from '@app/unit/api/service';

@Component({
  selector: 'dc-output-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive()
  ]
})
export class OutputListComponent implements OnInit {
  @Input() calcs: ICalc[];
  @Input() units: IUnit[];

  constructor(
    private calcService: CalcAPIService,
    private unitService: UnitAPIService,
  ) { }

  ngOnInit() {}

  getCalcKey = (index: number, calc: ICalc) => calc.id;

  getOutputUnits = (type: string): IUnit[] => this.units && type ? this.units.filter(u => u.type === type) : null;
  getOutputUnit = (symbol: string): IUnit => this.units && symbol ? this.units.find(u => u.symbol === symbol) : null;
  getOutputUnitType = (symbol: string): string => {
    const unit: IUnit = this.getOutputUnit(symbol);
    return unit ? unit.type : null;
  }
}
