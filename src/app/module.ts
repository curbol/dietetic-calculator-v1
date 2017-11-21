import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { routes } from '@app/routes';
import { AppComponent } from '@app/component';
import { UnitService } from '@app/unit/api/service';
import { EquationService } from '@app/equation/service';
import { HeaderComponent } from '@app/header/component';
import { ToolbarComponent } from '@app/toolbar/toolbar.component';
import { AboutComponent } from '@app/about/component';
import { CalculatorModule } from '@app/calculator/module';
import { SharedModule } from '@app/shared/module';
import { ConverterModule } from '@app/converter/module';

import {
  WeightUnitsResolver,
  LengthUnitsResolver,
  AllUnitsResolver,
  TimeUnitsResolver
} from './unit/unit-resolvers';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalculatorModule,
    SharedModule,
    ConverterModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    AboutComponent,
  ],
  providers: [
    EquationService,
    UnitService,
    AllUnitsResolver,
    WeightUnitsResolver,
    LengthUnitsResolver,
    TimeUnitsResolver,

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
