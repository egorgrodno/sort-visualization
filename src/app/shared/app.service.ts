import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
