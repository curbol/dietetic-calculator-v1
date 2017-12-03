import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { routes } from '@app/routes';
import { AppComponent } from '@app/component';
import { UnitAPIService } from '@app/unit/api/service';
import { UnitActions } from '@app/unit/state/actions';
import { UnitEpics } from '@app/unit/state/epics';
import { HeaderComponent } from '@app/header/component';
import { ToolbarComponent } from '@app/toolbar/component';
import { AboutComponent } from '@app/about/component';
import { CalculatorModule } from '@app/calculator/module';
import { SharedModule } from '@app/shared/module';
import { ConverterModule } from '@app/converter/module';
import { StoreModule } from '@app/store/module';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CalculatorModule,
    SharedModule,
    ConverterModule,
    StoreModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    AboutComponent,
  ],
  providers: [
    UnitAPIService,
    UnitActions,
    UnitEpics,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
