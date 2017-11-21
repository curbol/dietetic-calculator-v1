import { CalculationToolComponent } from "@app/calculator/component";
import { ConverterToolComponent } from "@app/unit-conversion/converter-tool/converter-tool.component";

export const routes: Routes = [
  {
    path: 'calc',
    component: CalculationToolComponent,
    data: { title: 'Calculators', isHome: true },
    resolve: { calculators: CalculatorsResolver, inputs: InputsResolver, selections: SelectionsResolver }
  },
  {
    path: 'calc/:settings',
    component: CalculationToolComponent,
    data: { title: 'Calculators', isHome: true },
    resolve: { calculators: CalculatorsResolver, inputs: InputsResolver, selections: SelectionsResolver }
  },
  {
    path: 'convert',
    component: ConverterToolComponent,
    data: { title: 'Unit Converter', subtitle: 'Convert a Value From One Unit to Another' },
    resolve: { allUnits: AllUnitsResolver }
  },
  { path: 'about',
    component: AboutComponent,
    data: { title: 'About', subtitle: 'Information About This Site' }
  },
  {
    path: '',
    redirectTo: 'calc',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'calc',
    pathMatch: 'full'
  }
];
