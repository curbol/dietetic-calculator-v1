import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { slideInOnRouteChange } from '../animation/animations';

@Component({
  selector: 'dc-header',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  animations: [
    slideInOnRouteChange()
  ]
})
export class HeaderComponent implements OnInit {
  isHome: boolean;
  title: string;
  subtitle: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        const activatedRouteSnapshot = activatedRoute.root.firstChild.snapshot;
        this.isHome = activatedRouteSnapshot.data['isHome'];
        this.title = activatedRouteSnapshot.data['title'];
        this.subtitle = activatedRouteSnapshot.data['subtitle'];
      });
  }

  ngOnInit() {
  }
}
