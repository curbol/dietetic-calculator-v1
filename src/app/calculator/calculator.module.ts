import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';
import { CalculatorsListComponent } from './calculator-list/calculators-list.component';
import { CalculatorListService } from './calculator-list-service/calculator-list.service';
import { EquationService } from './equation/equation.service';
import { UnitService } from './unit/unit.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorsListComponent,
    BodyMassIndexComponent
  ],
  providers: [CalculatorListService]
})
export class CalculatorModule { }
