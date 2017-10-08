import { Component, OnInit } from '@angular/core';

import { AboutProfile } from './about-profile';

@Component({
  selector: 'dc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  profiles: AboutProfile[] = [
    {
      name: 'Curtis Bollinger',
      title: 'Software Engineer',
      linkedInUrl: 'http://www.linkedin.com/in/curtis-bollinger'
    },
    {
      name: 'Chelsey Bollinger',
      title: 'Registered Dietitian',
      linkedInUrl: 'https://www.linkedin.com/in/chelsey-bollinger-rd-a2879bb7'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
