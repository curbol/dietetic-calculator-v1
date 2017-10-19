import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CalculationToolComponent } from './tool/calculation-tool.component';
import { CalculatorService } from './service/calculator.service';
import { CalculatorsResolver, InputsResolver } from './service/calc-resolvers';
import { CalculatorOptionsComponent } from './tool/calculators/calculator-options.component';
import { CalculatorInputsComponent } from './tool/inputs/calculator-inputs.component';
import { CalculatorOutputsComponent } from './tool/outputs/calculator-outputs.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculationToolComponent,
    CalculatorOptionsComponent,
    CalculatorInputsComponent,
    CalculatorOutputsComponent,
  ],
  providers: [
    CalculatorService,
    CalculatorsResolver,
    InputsResolver
  ]
})
export class CalculatorModule { }
