import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { CalculationToolComponent } from '../calculator/tool/calculation-tool.component';
import { CalculatorsResolver, InputsResolver, SelectionsResolver } from '../calculator/service/calc-resolvers';
import { ConverterToolComponent } from '../unit-conversion/converter-tool/converter-tool.component';
import { AllUnitsResolver } from '../unit/unit-resolvers';

const routes: Routes = [
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
    data: { title: 'Unit Converter', subtitle: 'Tool For Converting a Value\'s Units' },
    resolve: { units: AllUnitsResolver }
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
