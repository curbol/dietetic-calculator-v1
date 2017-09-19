import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdToolbarModule,
  MdGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdGridListModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdGridListModule
  ]
})
export class MyMaterialsModule { }
