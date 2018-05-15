import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';

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
