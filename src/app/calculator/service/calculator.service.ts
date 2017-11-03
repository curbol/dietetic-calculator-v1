import { Injectable } from '@angular/core';
import { UnitService } from '@app/unit/unit.service';
import { EquationService } from '@app/equation/equation.service';
import { Unit } from '@app/unit/unit';
import { Calc } from '@app/calculator/calc';
import { Option } from '@app/calculator/option';

@Injectable()
export class CalculatorService {
  private resultMap: {[key: string]: (inputs: {[key: string]: number}) => (selections: {[key: string]: string}) => number} = {
    'bmi': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
      const weight = inputs[Calc.Input.Id[Calc.Input.Id.weight]];
      const height = inputs[Calc.Input.Id[Calc.Input.Id.height]];
      return this.equationService.bodyMassIndex(weight)(height);
    },
    'mifflin': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
      const gender = selections[Calc.Selection.Id[Calc.Selection.Id.gender]];
      const weight = inputs[Calc.Input.Id[Calc.Input.Id.weight]];
      const height = inputs[Calc.Input.Id[Calc.Input.Id.height]];
      const age = inputs[Calc.Input.Id[Calc.Input.Id.age]];
      return this.equationService.mifflinStJeor(gender)(weight)(height)(age);
    },
    'ibw': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
      const gender = selections[Calc.Selection.Id[Calc.Selection.Id.gender]];
      const height = inputs[Calc.Input.Id[Calc.Input.Id.height]];
      return this.equationService.idealBodyWeight(gender)(height);
    },
    'abw': (inputs: {[key: string]: number}) => (selections: {[key: string]: string}): number => {
      const gender = selections[Calc.Selection.Id[Calc.Selection.Id.gender]];
      const weight = inputs[Calc.Input.Id[Calc.Input.Id.weight]];
      const height = inputs[Calc.Input.Id[Calc.Input.Id.height]];
      return this.equationService.adjustedBodyWeight(gender)(weight)(height);
    },
  };

  private calcs: Calc.Calc[] = [
    {
      id: Calc.Id.bmi,
      title: 'Body Mass Index (BMI)',
      subTitle: 'A measure of body fat in adults',
      group: Calc.Group.anthropometric,
      active: false,
      inputs: [
        { id: Calc.Input.Id.height, targetSymbol: Unit.Symbol.m },
        { id: Calc.Input.Id.weight, targetSymbol: Unit.Symbol.kg },
      ],
      selectionIds: [],
      outputUnitText: 'kg/m²',
    },
    {
      id: Calc.Id.mifflin,
      title: 'Mifflin St. Jeor',
      subTitle: 'Daily calorie needs for adults',
      group: Calc.Group.nutritional_needs,
      active: false,
      inputs: [
        { id: Calc.Input.Id.height, targetSymbol: Unit.Symbol.cm },
        { id: Calc.Input.Id.weight, targetSymbol: Unit.Symbol.kg },
        { id: Calc.Input.Id.age, targetSymbol: Unit.Symbol.y },
      ],
      selectionIds: [Calc.Selection.Id.gender],
      outputUnitText: 'kcal',
    },
    {
      id: Calc.Id.ibw,
      title: 'Ideal Body Weight (IBW)',
      subTitle: 'Estimated ideal weight for adults',
      group: Calc.Group.anthropometric,
      active: false,
      inputs: [
        { id: Calc.Input.Id.height, targetSymbol: Unit.Symbol.in },
      ],
      selectionIds: [Calc.Selection.Id.gender],
      outputUnitText: Unit.Symbol[Unit.Symbol.kg],
    },
    {
      id: Calc.Id.abw,
      title: 'Adjusted Body Weight (ABW)',
      subTitle: 'Adjusted ideal weight for the obese',
      group: Calc.Group.anthropometric,
      active: false,
      inputs: [
        { id: Calc.Input.Id.height, targetSymbol: Unit.Symbol.in },
        { id: Calc.Input.Id.weight, targetSymbol: Unit.Symbol.kg },
      ],
      selectionIds: [Calc.Selection.Id.gender],
      outputUnitText: Unit.Symbol[Unit.Symbol.kg],
    },
  ];

  private Selections = <Calc.Selection[]>[
    {
      id: Calc.Selection.Id.gender,
      name: 'Gender',
      group: <Option.Option[]>[
        {
          id: Option.Id.male,
          name: 'Male',
        },
        {
          id: Option.Id.female,
          name: 'Female',
        }
      ],
      value: null,
      active: false,
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

  constructor(private unitService: UnitService, private equationService: EquationService) { }

  getCalculators = () => new Promise<Calc.Calc[]>((resolve, reject) => resolve(this.calcs));
  getAllSelections = (): Promise<Calc.Selection[]> => new Promise<Calc.Selection[]>((resolve, reject) => resolve(this.Selections));

  getAllInputs = (): Promise<Calc.Input[]> => {
    return Promise.all([this.getInputSettings(), this.unitService.getAllUnits()]).then(value => {
      const inputSettings: Calc.Input.Settings[] = value[0];
      const units: {[type: number]: Unit.Unit[]} = value[1];

      return inputSettings.map<Calc.Input>(p => {
        const group = Unit.filterUnits(units[p.typeId])(p.symbolsFilter);
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

  getInputs = (inputIds: Calc.Input.Id[]) =>
    this.getAllInputs().then((inputs: Calc.Input[]) => inputs.filter(input => inputIds.find(id => id === input.id)))

  getResult = (calc: Calc.Calc) => (inputs: Calc.Input[]) => (selections: Calc.Selection[]): number => {
    const inputConversions: {[key: string]: number} = this.getInputConversions(calc.inputs)(inputs);
    const selectedValues: {[key: string]: string} = this.getSelectedValues([Calc.Selection.Id.gender])(selections);

    if (Object.values(inputConversions).some(a => a === null) ||
        Object.values(selectedValues).some(a => a === null)) { return null; }

    return this.resultMap[Calc.Id[calc.id]](inputConversions)(selectedValues);
  }

  private getSelectedValues = (selectionIds: Calc.Selection.Id[]) => (selections: Calc.Selection[]) => {
    const result: {[key: string]: string} = {};
    selectionIds.forEach(id => {
      const selection: Calc.Selection = selections.find(s => s.id === id);
      result[Calc.Selection.Id[id]] = selection && selection.value ? Option.Id[selection.value.id] : null;
    });
    return result;
  }

  private getInputConversions = (requests: {id: Calc.Input.Id; targetSymbol: Unit.Symbol}[]) => (inputs: Calc.Input[]) => {
    const result: {[key: string]: number} = {};
    requests.forEach(r => {
      const input: Calc.Input = inputs.find(s => s.id === r.id);
      const conversion: number = input && input.value ? Calc.inputConversion(input)(r.targetSymbol) : null;
      result[Calc.Input.Id[r.id]] = conversion;
    });
    return result;
  }

  private getInputSettings = () => new Promise<Calc.Input.Settings[]>((resolve, reject) => resolve(this.inputSettings));
}
