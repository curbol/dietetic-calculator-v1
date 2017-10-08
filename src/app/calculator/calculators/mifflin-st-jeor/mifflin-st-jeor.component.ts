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
  weightSelection: Unit.ISelection;
  heightSelection: Unit.ISelection;

  get result(): number {
    if (!this.weightSelection.value || !this.heightSelection.value) {
      return null;
    }

    const weight_kg: number = this.unitService.selectionConversion(this.weightSelection)(Unit.Symbol.kg);
    const height_m: number = this.unitService.selectionConversion(this.heightSelection)(Unit.Symbol.m);
    const bmi: number = this.equationService.bodyMassIndex(weight_kg)(height_m);
    const roundedBmi: number = Math.round(bmi * 10) / 10;

    return roundedBmi;
  }

  constructor(private route: ActivatedRoute, private unitService: UnitService, private equationService: EquationService) { }

  ngOnInit() {
    const weightUnits: Unit.IUnit[] = this.route.snapshot.data['weightUnits'];
    this.weightSelection = { group: weightUnits, unit: null, value: null };

    const heightUnits: Unit.IUnit[] = this.route.snapshot.data['heightUnits'];
    this.heightSelection = { group: heightUnits, unit: null, value: null };

    this.system = Unit.System[Unit.System.metric];
    this.setDefaultUnitSystem(this.system);
  }

  setDefaultUnitSystem(systemString: string): void {
    const system: Unit.System = Unit.System[systemString] || Unit.System.metric;

    this.weightSelection.unit = this.unitService.defaultUnit(this.weightSelection.group)(system);
    this.heightSelection.unit = this.unitService.defaultUnit(this.heightSelection.group)(system);
  }

  updateSystem() {
    if (this.weightSelection.unit.system === this.heightSelection.unit.system) {
      this.system = Unit.System[this.weightSelection.unit.system];
    } else {
      this.system = null;
    }
  }

  unitString(symbol: Unit.Symbol): string {
    return Unit.Symbol[symbol];
  }
}
