import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/isEmpty';
import 'rxjs/add/operator/max';
import 'rxjs/add/operator/min';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { ResultComponent } from '@app/shared/result/component';
import { InputComponent } from '@app/shared/input/component';
import { MaterialModule } from '@app/shared/material/module';
import { CapitalizePipe } from '@app/shared/capitalize/pipe';
import { GroupByPipe } from '@app/shared/group-by/pipe';

@NgModule({
  declarations: [
    ResultComponent,
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
    CapitalizePipe,
    GroupByPipe,
    InputComponent,
  ]
})
export class SharedModule { }
