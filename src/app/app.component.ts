import { Component, trigger, state, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-root',
  animations: [
    trigger('isHomeChanged', [
      state('true' , style({ height: '*', opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ height: '0', opacity: 0, transform: 'scale(0.0)'  })),
      transition('1 => 0', animate('200ms')),
      transition('0 => 1', animate('100ms'))
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  route: string;

  get isHome(): boolean {
    return this.route === '/' || this.route === '/calcs';
  }

  constructor(private router: Router, private location: Location) {
    router.events.subscribe((val) => {
      this.route = location.path();
    });
  }
}
