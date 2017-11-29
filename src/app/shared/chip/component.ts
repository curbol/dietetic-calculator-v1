import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dc-chip',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class ChipComponent implements OnInit {
  @Input() color: string;
  @Input() dense: boolean;

  get primary(): boolean { return this.color === 'primary'; }
  get accent(): boolean { return this.color === 'accent'; }
  get warn(): boolean { return this.color === 'warn'; }
  get default(): boolean {return !this.primary && !this.accent && !this.warn; }

  constructor() { }

  ngOnInit() {}
}
