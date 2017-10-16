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
      inputIds: [Calc.Input.Id.height, Calc.Input.Id.weight],
    },
    {
      id: Calc.Id.mifflin,
      title: 'Mifflin St. Jeor',
      subTitle: 'Daily calorie needs for adults',
      inputIds: [Calc.Input.Id.weight, Calc.Input.Id.age],
    }
  ];

  private inputSettings = <Calc.Input.Settings[]>[
    {
      name: 'Weight',
      id: Calc.Input.Id.weight,
      typeId: Unit.Type.weight.id,
      symbolsFilter: null,
      defaultSymbol: Unit.Symbol.kg,
    },
    {
      name: 'Height',
      id: Calc.Input.Id.height,
      typeId: Unit.Type.length.id,
      symbolsFilter: null,
      defaultSymbol: Unit.Symbol.cm,
    },
    {
      name: 'Age',
      id: Calc.Input.Id.age,
      typeId: Unit.Type.time.id,
      symbolsFilter: [Unit.Symbol.y],
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

      return inputSettings.map<Calc.Input>(p => {
        const group = this.unitService.filterUnits(units[p.typeId])(p.symbolsFilter);
        const unit = group.find(u => u.symbol === p.defaultSymbol);
        return <Calc.Input>{
          name: p.name,
          id: p.id,
          group: group,
          unit: unit,
          active: false,
          value: null,
        };
      });
    });
  }

  getInputs = (inputIds: Calc.Input.Id[]) => this.getAllInputs().then(
    (inputs: Calc.Input[]) => inputs.filter(input => inputIds.find(id => id === input.id))
  )

  getInputIds = (calcs: Calc.Calc[]) => {
    if (!calcs || calcs.length <= 0) {
      return null;
    }

    const mergedInputIds: Calc.Input.Id[] = [].concat.apply([], calcs.map(i => i.inputIds));
    const distinctInputIds: Calc.Input.Id[] = mergedInputIds.filter((v, i, a) => a.indexOf(v) === i);

    return distinctInputIds;
  }

  commonUnitSystem = (inputs: Calc.Input[]) => {
    if (!inputs || inputs.length <= 0) {
      return null;
    }

    const inputsWithSystem = inputs.filter(input => input.unit && input.unit.system != null);
    const systems = inputsWithSystem.map(input => input.unit.system);
    const distinctSystems = systems.filter((v, i, a) => a.indexOf(v) === i);
    const allSame: boolean = distinctSystems.length === 1;

    return allSame ? distinctSystems[0] : null;
  }

  inputConversion = (input: Calc.Input) => (targetSymbol: Unit.Symbol) => {
    const targetUnit = input.group.find(u => u.symbol === targetSymbol);
    return this.unitService.conversion(input.unit.factor)(targetUnit.factor)(input.value);
  }
}
