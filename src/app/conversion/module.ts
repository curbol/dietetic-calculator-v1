import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/module';
import { ConverterComponent } from '@app/conversion/component';
import { ConversionService } from '@app/conversion/service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ConverterComponent,
  ],
  providers: [
    ConversionService,
  ]
})
export class ConverterModule { }
