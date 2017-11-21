import { Component, OnInit } from '@angular/core';
import { AboutProfile } from '@app/about/models';

@Component({
  selector: 'dc-about',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
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
