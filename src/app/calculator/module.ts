import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/module';
import { CalculatorComponent } from '@app/calculator/component';
import { CalcListComponent } from '@app/calculator/calc-list/component';
import { InputListComponent } from '@app/calculator/input-list/component';
import { OutputListComponent } from '@app/calculator/output-list/component';
import { CalcAPIService } from '@app/calculator/api/service';
import { CalcAPIActions } from '@app/calculator/api/actions';
import { CalcAPIEpics } from '@app/calculator/api/epics';

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
    CalcAPIActions,
    CalcAPIEpics,
  ]
})
export class CalculatorModule { }
