import { NgModule } from '@angular/core';

import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';
import { CalculatorsListComponent } from './calculators-list/calculators-list.component';
import { SharedModule } from '../shared/shared.module';
import { CalculatorService } from './calculator-service/calculator.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorsListComponent,
    BodyMassIndexComponent
  ],
  providers: [CalculatorService]
})
export class CalculatorModule { }
