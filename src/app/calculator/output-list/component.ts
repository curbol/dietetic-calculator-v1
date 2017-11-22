import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { appearOnActive } from '@app/animation/animations';
import { ICalc, Calc, IInput, ISelect } from '@app/calculator/models';
import { CalcAPIService } from '@app/calculator/api/service';
import { UnitService } from '@app/unit/api/service';

@Component({
  selector: 'dc-output-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    appearOnActive()
  ]
})
export class OutputListComponent implements OnInit {
  @Input() calculators: ICalc[];
  get activeCalculators(): ICalc[] {
    if (!this.calculators) { return null; }
    return this.calculators.filter(c => c.active);
  }

  @Input() inputs: IInput[];
  @Input() selections: ISelect[];

  constructor(
    private calcService: CalcAPIService,
    private unitService: UnitService,
  ) { }

  ngOnInit() {}

  // getResult = (calc: ICalc): number => {
  //   return this.calcService.getResult(calc)(this.inputs)(this.selections);
  // }

  // getActiveCompletedResults = (): ICalc[] =>
  //   this.calculators.filter(c => c.active && (this.calcService.getResult(c)(this.inputs)(this.selections) || 0) !== 0)
}
