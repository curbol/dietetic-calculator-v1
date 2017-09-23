import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-root',
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
