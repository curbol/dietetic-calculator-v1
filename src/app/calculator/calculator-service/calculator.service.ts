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

  private inputSettingss: Calc.InputSettings[] = [
    {
      name: 'Weight',
      id: Calc.Input.Id.weight,
      type: Unit.Type.weight,
    }
  ];

  constructor(private unitService: UnitService) { }

  getCalculators(): Promise<Calc.Calc[]> {
    return new Promise<Calc.Calc[]>((resolve, reject) => {
      resolve(this.calcs);
    });
  }

  getInputs(inputIds: Calc.Input.Id[]): Promise<Calc.Input[]> {
    return this.unitService.getUnits().then((units: Unit.Unit[]) =>
      this.inputSettingss
        .filter(i => inputIds.find(id => id === i.id))
        .map(i => this.mapInput(i, units))
    );
  }

  private mapInput(inputSettings: Calc.InputSettings, units: Unit.Unit[]): Calc.Input {
    const group: Unit.Unit[] = units.filter(u => u.type === inputSettings.type);
    const defaultUnit: Unit.Unit = this.unitService.defaultUnit(group)(Unit.System.metric);

    return {
      name: inputSettings.name,
      id: inputSettings.id,
      group: group,
      unit: defaultUnit,
      value: null,
    };
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
