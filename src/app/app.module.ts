import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SortModule } from './sort/sort.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatIconModule,
    MatToolbarModule,

    SortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
