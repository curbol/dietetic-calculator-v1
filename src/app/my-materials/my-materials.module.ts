import { NgModule } from '@angular/core';
import { 
  MdButtonModule, 
  MdCardModule 
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule
  ]
})
export class MyMaterialsModule { }
