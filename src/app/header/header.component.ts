import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isHome: boolean;
  title: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        const activatedRouteSnapshot = activatedRoute.root.firstChild.snapshot;
        this.isHome = activatedRouteSnapshot.data['isHome'];
        this.title = activatedRouteSnapshot.data['title'];
      });
  }

  ngOnInit() {
  }
}
