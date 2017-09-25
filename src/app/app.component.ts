import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('moveOnLoad', [
      transition('* <=> *', [
        style({transform: 'translateX(-20%)'}),
        animate('400ms ease-in-out')
      ])
    ])
  ],
  host: {'[@moveOnLoad]': ''}
})
export class AppComponent {
  constructor() {}

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
