import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';
import { CalculatorsListComponent } from './calculators-list/calculators-list.component';
import { MyMaterialsModule } from '../my-materials/my-materials.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MyMaterialsModule,
    RouterModule
  ],
  declarations: [
    CalculatorsListComponent,
    BodyMassIndexComponent
  ]
})
export class CalculatorModule { }
