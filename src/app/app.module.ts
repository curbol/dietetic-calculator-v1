import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { UnitConversionModule } from './unit-conversion/unit-conversion.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AboutComponent } from './about/about.component';
import { EquationService } from './equation/equation.service';
import { UnitService } from './unit/unit.service';
import {
  WeightUnitsResolver,
  LengthUnitsResolver,
  AllUnitsResolver,
  TimeUnitsResolver
} from './unit/unit-resolvers';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CalculatorModule,
    SharedModule,
    UnitConversionModule
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
export class AppModule { }
