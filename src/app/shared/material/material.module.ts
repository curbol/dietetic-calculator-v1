import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdMenuModule,
  MdCardModule,
  MdToolbarModule,
  MdIconModule,
  MdCommonModule,
  MdSidenavModule
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
    MdSidenavModule
  ]
})
export class MaterialModule { }
