import { Component, OnInit } from '@angular/core';
import { Unit } from '../../unit/unit';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../../unit/unit.service';
import { EquationService } from '../../equation/equation.service';

@Component({
  selector: 'dc-mifflin-st-jeor',
  templateUrl: './mifflin-st-jeor.component.html',
  styleUrls: ['./mifflin-st-jeor.component.css']
})
export class MifflinStJeorComponent implements OnInit {
  system: string;
  unitSelections: Map<string, Unit.ISelection> = new Map<string, Unit.ISelection>();

  get result(): number {
    if (this.unitSelections.size <= 0 && Array.from(this.unitSelections.values()).every(s => s != null)) {
      return null;
    }

    const weight_kg: number = this.unitService.selectionConversion(this.unitSelections['weightSelector'])(Unit.Symbol.kg);
    const height_m: number = this.unitService.selectionConversion(this.unitSelections['heightSelector'])(Unit.Symbol.m);
    const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    const roundedBmi: number = Math.round(bmi * 10) / 10;

    return roundedBmi;
  }

  constructor(private route: ActivatedRoute, private unitService: UnitService, private equationService: EquationService) { }

  ngOnInit() {
    this.unitSelections['weightSelector'] = this.route.snapshot.data['weightSelector'];
    this.unitSelections['heightSelector'] = this.route.snapshot.data['heightSelector'];

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;
    Array.from(this.unitSelections.values()).forEach(s => s.unit = this.unitService.defaultUnit(s.group)(system));
  }

  updateSystem(): void {
    const commonSystem: Unit.System = this.unitService.getCommonSystem(Array.from(this.unitSelections.values()));
    this.system = commonSystem ? Unit.System[commonSystem] : null;
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
