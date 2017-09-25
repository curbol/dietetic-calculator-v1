import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorsListComponent } from './calculator/calculators-list/calculators-list.component';
import { BodyMassIndexComponent } from './calculator/body-mass-index/body-mass-index.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'calcs', component: CalculatorsListComponent,
    data: { state: 'calcs', title: 'Calculators', isHome: true } },
  { path: 'calcs/bmi', component: BodyMassIndexComponent,
    data: { state: 'bmi', title: 'Body Mass Index' } },
  { path: 'about', component: AboutComponent,
    data: { state: 'about', title: 'About' } },
  { path: '', redirectTo: 'calcs', pathMatch: 'full' },
  { path: '**', redirectTo: 'calcs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
