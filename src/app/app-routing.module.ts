import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CalculationToolComponent } from './calculator/tool/calculation-tool.component';
import { CalculatorsResolver, InputsResolver } from './calculator/service/calc-resolvers';

const routes: Routes = [
  {
    path: 'calc',
    component: CalculationToolComponent,
    data: { title: 'Calculators', isHome: true },
    resolve: { calculators: CalculatorsResolver, inputs: InputsResolver }
  },
  { path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
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
