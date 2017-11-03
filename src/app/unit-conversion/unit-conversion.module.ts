import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterToolComponent } from './converter-tool/converter-tool.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ConverterToolComponent]
})
export class UnitConversionModule { }
