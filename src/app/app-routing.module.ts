import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { WeightUnitsResolver, LengthUnitsResolver } from './calculator/unit/unit-resolvers';
import { CalculatorsListComponent } from './calculator/calculator-list/calculators-list.component';
import { BodyMassIndexComponent } from './calculator/calculators/body-mass-index/body-mass-index.component';
import { MifflinStJeorComponent } from './calculator/calculators/mifflin-st-jeor/mifflin-st-jeor.component';

const routes: Routes = [
  {
    path: 'calcs',
    component: CalculatorsListComponent,
    data: { title: 'Calculators', isHome: true }
  },
  {
    path: 'calcs/bmi',
    component: BodyMassIndexComponent,
    data: { calc: true, title: 'Body Mass Index (BMI)', subtitle: 'A measure of body fat in adults' },
    resolve: { weightUnits: WeightUnitsResolver, heightUnits: LengthUnitsResolver }
  },
  {
    path: 'calcs/msj',
    component: MifflinStJeorComponent,
    data: { calc: true, title: 'Mifflin St. Jeor', subtitle: 'Daily calorie needs for adults' },
    resolve: { weightUnits: WeightUnitsResolver, heightUnits: LengthUnitsResolver }
  },
  { path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
  },
  {
    path: '',
    redirectTo: 'calcs',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'calcs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
