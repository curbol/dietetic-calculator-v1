import { Component } from '@angular/core';
import { slideInOnLoad, dropDownOnLoad } from './animation/animations';

@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInOnLoad(),
    dropDownOnLoad()
  ]
})
export class AppComponent {
  constructor() {}

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
