import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/module';
import { ConverterComponent } from '@app/converter/component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ConverterComponent
  ]
})
export class ConverterModule { }
