import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'dc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() title: string;
  @Input() value: number;
  @Input() units: string;

  constructor() { }

  ngOnInit() {
  }
}
