import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyMassIndexComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
