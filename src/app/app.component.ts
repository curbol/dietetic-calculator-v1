import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private _router: Router) {
    this.route = _router.url;
  }

  ngOnInit() {
    this._router.events.subscribe((end: NavigationEnd) => this.route = end.url);
  }
}
