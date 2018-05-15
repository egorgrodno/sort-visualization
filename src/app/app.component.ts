import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'mat-typography' },
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;

  private _titleSub: Subscription;

  constructor(
    private _appService: AppService,
  ) { }

  ngOnInit() {
    this._appService.appTitle.subscribe((title) => this.title = title);
  }

  ngOnDestroy() {
    this._titleSub.unsubscribe();
  }
}
