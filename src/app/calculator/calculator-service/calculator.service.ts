import { Injectable } from '@angular/core';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit';
import { Calc } from './calc';

@Injectable()
export class CalculatorService {
  private calcs: Calc.Calc[] = [
    {
      id: Calc.Id.bmi,
      title: 'Body Mass Index (BMI)',
      subTitle: 'A measure of body fat in adults',
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight]
    },
    {
      id: Calc.Id.mifflin,
      title: 'Mifflin St. Jeor',
      subTitle: 'Daily calorie needs for adults',
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight, Calc.Input.Id.age]
    }
  ];

  private inputSettings: Calc.Input.Settings[] = [
    {
      name: 'Weight',
      id: Calc.Input.Id.weight,
      symbols: [Unit.Weight.Symbol.kg, Unit.Weight.Symbol.g, Unit.Weight.Symbol.lb, Unit.Weight.Symbol.st],
      defaultSymbol: Unit.Weight.Symbol.kg,
    },
    {
      name: 'Height',
      id: Calc.Input.Id.height,
      symbols: [Unit.Length.Symbol.cm, Unit.Length.Symbol.m, Unit.Length.Symbol.in, Unit.Length.Symbol.ft, Unit.Length.Symbol.yd],
      defaultSymbol: Unit.Length.Symbol.cm,
    },
    {
      name: 'Age',
      id: Calc.Input.Id.age,
      symbols: [Unit.Time.Symbol.y],
      defaultSymbol: Unit.Time.Symbol.y,
    },
  ];

  constructor(private unitService: UnitService) { }

  getCalculators(): Promise<Calc.Calc[]> {
    return new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));
  }

  private getInputSettings(): Promise<Calc.Input.Settings[]> {
    return new Promise<Calc.Input.Settings[]>((resolve, reject) => resolve(this.inputSettings));
  }

  getAllInputs(): Promise<Calc.Input[]> {
    return Promise.all([this.getInputSettings(), this.unitService.getAllUnits()]).then(value => {
      const inputSettings: Calc.Input.Settings[] = value[0];
      const units: Unit.Unit[] = value[1];

      return inputSettings.map<Calc.Input>(s => {
        const group = s.symbols.map(symbol => units.find(u => u.symbol === symbol));
        const unit = group.find(u => u.symbol === s.defaultSymbol);
        return {
          settings: s,
          group: group,
          unit: unit,
          active: false,
          value: null,
        };
      });
    });
  }

  getInputs(inputIds: Calc.Input.Id[]): Promise<Calc.Input[]> {
    return this.getAllInputs().then((inputs: Calc.Input[]) =>
      inputs.filter(input => inputIds.find(id => id === input.settings.id))
    );
  }

  commonUnitSystem = (selections: Calc.Input[]) => {
    if (!selections || selections.length <= 0) {
      return null;
    }

    const firstSystem: Unit.System = selections[0].unit.system;
    const allSame: boolean = selections.every(v => v.unit.system === firstSystem);

    return allSame ? firstSystem : null;
  }

  inputConversion = (selection: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = selection.group.find(u => u.symbol === targetSymbol);
    return this.unitService.conversion(selection.unit)(targetUnit)(selection.value);
  }
}
