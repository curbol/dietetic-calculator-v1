import { NgModule } from '@angular/core';
import { 
  MdButtonModule, 
  MdCardModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule
  ]
})
export class MyMaterialsModule { }
