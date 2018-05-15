import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BarList } from './bar-list';

@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss'],
})
export class BarListComponent implements OnInit, OnDestroy {
  @Input() barList: BarList;

  private barListSub: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();
    this.barListSub = this.barList.onChange$.subscribe(() => {
      console.log('[BarList.component]: Change detection');
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.barListSub.unsubscribe();
  }
}
