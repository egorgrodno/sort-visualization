import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AppService } from './shared/app.service';
import { IS_DEFAULT_THEME_DARK } from './theme-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'mat-typography' },
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;

  private titleSub: Subscription;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private appService: AppService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.appService.appTitle.subscribe((title) => (this.title = title));
    this.onThemeChange(IS_DEFAULT_THEME_DARK);
  }

  ngOnDestroy() {
    this.titleSub.unsubscribe();
  }

  public onThemeChange(isNewThemeDark: boolean) {
    const classToAdd = (isNewThemeDark && 'dark-theme') || 'light-theme';
    const classToRemove = (isNewThemeDark && 'light-theme') || 'dark-theme';
    this.renderer.addClass(this.doc.body, classToAdd);
    this.renderer.removeClass(this.doc.body, classToRemove);
  }
}
