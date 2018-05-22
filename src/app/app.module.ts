import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { SortModule } from './sort';
import { ThemePickerModule } from './theme-picker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    MatCardModule,
    MatIconModule,
    MatToolbarModule,

    SortModule,
    ThemePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
