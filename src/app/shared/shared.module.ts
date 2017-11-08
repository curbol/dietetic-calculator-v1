import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

import { ResultComponent } from './result/result.component';
import { ChipComponent } from './chip/chip.component';
import { InputComponent } from './input/input.component';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/isEmpty';
import 'rxjs/add/operator/max';
import 'rxjs/add/operator/min';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';


@NgModule({
  declarations: [
    ResultComponent,
    ChipComponent,
    CapitalizePipe,
    GroupByPipe,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ResultComponent,
    ChipComponent,
    CapitalizePipe,
    GroupByPipe,
    InputComponent,
  ]
})
export class SharedModule { }
