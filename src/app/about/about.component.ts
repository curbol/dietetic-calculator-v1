import { Component, OnInit } from '@angular/core';

import { AboutProfile } from './about-profile';

@Component({
  selector: 'dc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutText: string[] = [
    `Dietetic Calculator is a tool created for dietitians to make common dietetics calculations quick and easy.
    The tool is developed by Curtis Bollinger and dietetics knowledge comes from Chelsey Bollinger, RD, LD.`,

    `This tool is a passion project that we work on in our spare time.
    More calculators and other functionality will be added over time.`,

    `Please contact us if you have any suggestions for improvements.
    Thank you for visiting!`
  ];

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
