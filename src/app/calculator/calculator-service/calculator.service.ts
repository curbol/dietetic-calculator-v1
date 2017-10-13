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

  private inputSettings = <Calc.Input.Settings[]>[
    {
      name: 'Weight',
      id: Calc.Input.Id.weight,
      type: Unit.Type.weight,
      symbols: [Unit.Symbol.kg, Unit.Symbol.g, Unit.Symbol.lb, Unit.Symbol.st],
      defaultSymbol: Unit.Symbol.kg,
    },
    {
      name: 'Height',
      id: Calc.Input.Id.height,
      type: Unit.Type.length,
      symbols: [Unit.Symbol.cm, Unit.Symbol.m, Unit.Symbol.in, Unit.Symbol.ft, Unit.Symbol.yd],
      defaultSymbol: Unit.Symbol.cm,
    },
    {
      name: 'Age',
      id: Calc.Input.Id.age,
      type: Unit.Type.time,
      symbols: [Unit.Symbol.y],
      defaultSymbol: Unit.Symbol.y,
    },
  ];

  constructor(private unitService: UnitService) { }

  private getInputSettings = () => new Promise<Calc.Input.Settings[]>((resolve, reject) => resolve(this.inputSettings));

  getCalculators = () => new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));

  getAllInputs(): Promise<Calc.Input[]> {
    return Promise.all([this.getInputSettings(), this.unitService.getAllUnits()]).then(value => {
      const inputSettings: Calc.Input.Settings[] = value[0];
      const units: {[type: number]: Unit.Unit[]} = value[1];

      return inputSettings.map<Calc.Input>(s => {
        const group = this.unitService.filterUnits(units[s.type])(s.symbols);
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

  getInputs = (inputIds: Calc.Input.Id[]) => this.getAllInputs().then(
    (inputs: Calc.Input[]) => inputs.filter(input => inputIds.find(id => id === input.settings.id))
  )

  commonUnitSystem = (inputs: Calc.Input[]) => {
    if (!inputs || inputs.length <= 0) {
      return null;
    }

    const firstSystem: Unit.System = inputs[0].unit.system;
    const allSame: boolean = inputs.every(v => v.unit.system === firstSystem);

    return allSame ? firstSystem : null;
  }

  inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    return this.unitService.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  }
}
