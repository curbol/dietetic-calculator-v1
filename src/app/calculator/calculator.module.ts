import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';
import { CalculatorsListComponent } from './calculators-list/calculators-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalculatorsListComponent,
    BodyMassIndexComponent
  ]
})
export class CalculatorModule { }
