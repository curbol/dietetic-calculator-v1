import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/module';
import { ConverterComponent } from '@app/converter/component';
import { ConverterEpics } from '@app/converter/state/epics';
import { ConverterActions } from '@app/converter/state/actions';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ConverterComponent,
  ],
  providers: [
    ConverterEpics,
    ConverterActions,
  ]
})
export class ConverterModule { }
