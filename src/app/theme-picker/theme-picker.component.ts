import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export const IS_DEFAULT_THEME_DARK = false;

@Component({
  selector: 'app-theme-picker',
  template: `<button mat-button (click)="toggleTheme()">Switch to {{ isDark && 'light' || 'dark' }} theme</button>`,
})
export class ThemePickerComponent implements OnInit {

  @Output() onChange = new EventEmitter<boolean>();

  public isDark = IS_DEFAULT_THEME_DARK;

  constructor() { }

  ngOnInit() { }

  public toggleTheme(): void {
    this.isDark = !this.isDark;
    this.onChange.emit(this.isDark);
  }
}
