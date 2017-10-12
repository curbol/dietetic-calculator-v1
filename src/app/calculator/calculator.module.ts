import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ResultComponent } from './result/result.component';
import { CalculationToolComponent } from './calculation-tool/calculation-tool.component';
import { CalculatorService } from './calculator-service/calculator.service';
import { CalculatorsResolver, InputsResolver } from './calculator-service/calc-resolvers';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ResultComponent,
    CalculationToolComponent
  ],
  providers: [
    CalculatorService,
    CalculatorsResolver,
    InputsResolver
  ]
})
export class CalculatorModule { }
