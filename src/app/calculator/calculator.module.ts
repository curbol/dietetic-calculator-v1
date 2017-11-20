import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CalculationToolComponent } from './tool/calculation-tool.component';
import { CalculatorService } from './service/calculator.service';
import { CalculatorsResolver, InputsResolver, SelectionsResolver } from './service/calc-resolvers';
import { CalculatorOptionsComponent } from './tool/calculators/calculator-options.component';
import { CalculatorInputsComponent } from './tool/inputs/calculator-inputs.component';
import { CalculatorOutputsComponent } from './tool/outputs/calculator-outputs.component';
import { SystemSelectorComponent } from './tool/system-selector/system-selector.component';
import { CalculatorActions } from '@app/calculator/state/calculator.actions';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculationToolComponent,
    CalculatorOptionsComponent,
    CalculatorInputsComponent,
    CalculatorOutputsComponent,
    SystemSelectorComponent,
  ],
  providers: [
    CalculatorService,
    CalculatorsResolver,
    InputsResolver,
    SelectionsResolver,
    CalculatorActions,
  ]
})
export class CalculatorModule { }
