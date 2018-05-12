import { Component, OnInit, Input } from '@angular/core';

import { Bar } from '../bar/bar';

@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss'],
})
export class BarListComponent implements OnInit {
  @Input() bars: Bar[];

  constructor() { }

  ngOnInit() { }
}
