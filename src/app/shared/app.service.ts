import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public appTitle: Observable<string>;

  private _appTitle: Subject<string>;

  constructor() {
    this._appTitle = new Subject();
    this.appTitle = this._appTitle.asObservable();
  }

  public setTitle(title: string): void {
    this._appTitle.next(title);
  }
}
