import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private route: string;
  title: string;

  routeDescriptions: { [route: string]: string; } = 
  {
    "/about": "About",
    "/calcs": "Calculators",
    "/calcs/bmi": "Body Mass Index"
  };

  get isHome(): boolean {
    return this.route === '/' || this.route === '/calcs';
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    router.events.subscribe(val => {
      this.route = location.path();
      this.title = "test" + this.activatedRoute.snapshot.data['title'];
      //this.title = this.routeDescriptions[this.route];
    });
  }

  ngOnInit() {
  }
}
