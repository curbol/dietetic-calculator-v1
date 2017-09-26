import { Component } from '@angular/core';
import { slideInOnRouteChange } from './animation/animations';

@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInOnRouteChange()
  ]
})
export class AppComponent {
  constructor() {}

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
