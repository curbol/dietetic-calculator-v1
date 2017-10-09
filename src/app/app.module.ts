import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AboutComponent } from './about/about.component';
import { EquationService } from './calculator/equation/equation.service';
import { UnitService } from './calculator/unit/unit.service';
import {
  WeightUnitsResolver,
  LengthUnitsResolver
} from './calculator/unit/unit-resolvers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CalculatorModule,
    SharedModule
  ],
  providers: [
    EquationService,
    UnitService,
    WeightUnitsResolver,
    LengthUnitsResolver
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
