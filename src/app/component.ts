import { Component } from '@angular/core';
import { slideInOnRouteChange } from './animation/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dc-root',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    slideInOnRouteChange()
  ]
})
export class AppComponent {
  constructor() {}

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.title;
  }
}
