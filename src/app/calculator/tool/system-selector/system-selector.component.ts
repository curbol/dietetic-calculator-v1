import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Unit } from '@app/unit/unit';

@Component({
  selector: 'dc-system-selector',
  templateUrl: './system-selector.component.html',
  styleUrls: ['./system-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemSelectorComponent implements OnInit {
  _system: Unit.System;
  get system(): Unit.System { return this._system; }
  @Output() systemChange: EventEmitter<Unit.System> = new EventEmitter<Unit.System>();
  @Input() set system(value: Unit.System) {
    this._system = value;
    this.systemChange.emit(value);
  }

  get systemString(): string { return Unit.System[this.system]; }
  set systemString(value: string) { this.system = Unit.System[value]; }

  constructor() { }

  ngOnInit() {}

  log(test: any) {
    console.log(test);
  }
}
