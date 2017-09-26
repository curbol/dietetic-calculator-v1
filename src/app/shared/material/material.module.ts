import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdMenuModule,
  MdCardModule,
  MdToolbarModule,
  MdIconModule,
  MdCommonModule,
  MdSidenavModule,
  MdInputModule,
  MdFormFieldModule,
  MdRadioModule
} from '@angular/material';

@NgModule({
  imports: [
  ],
  exports: [
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdCommonModule,
    MdSidenavModule,
    MdInputModule,
    MdFormFieldModule,
    MdRadioModule
  ]
})
export class MaterialModule { }
