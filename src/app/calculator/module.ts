import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/module';
import { CalculatorComponent } from '@app/calculator/component';
import { CalcListComponent } from '@app/calculator/calc-list/component';
import { InputListComponent } from '@app/calculator/input-list/component';
import { OutputListComponent } from '@app/calculator/output-list/component';
import { CalcAPIService } from '@app/calculator/api/service';
import { Equations } from '@app/calculator/equation/service';
import { CalcActions } from '@app/calculator/state/actions';
import { CalcEpics } from '@app/calculator/state/epics';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorComponent,
    CalcListComponent,
    InputListComponent,
    OutputListComponent,
  ],
  providers: [
    CalcAPIService,
    Equations,
    CalcActions,
    CalcEpics,
  ]
})
export class CalculatorModule { }
