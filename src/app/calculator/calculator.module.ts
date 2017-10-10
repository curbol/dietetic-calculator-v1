import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CalculatorsListComponent } from './calculator-list/calculators-list.component';
import { EquationService } from './equation/equation.service';
import { UnitService } from './unit/unit.service';
import { ResultComponent } from './result/result.component';

import { BodyMassIndexComponent } from './calculators/body-mass-index/body-mass-index.component';
import { MifflinStJeorComponent } from './calculators/mifflin-st-jeor/mifflin-st-jeor.component';
import { CalculationToolComponent } from './calculation-tool/calculation-tool.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorsListComponent,
    BodyMassIndexComponent,
    ResultComponent,
    MifflinStJeorComponent,
    CalculationToolComponent
  ],
  providers: []
})
export class CalculatorModule { }
