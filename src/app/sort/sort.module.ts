import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

import { BarComponent } from './bar/bar.component';
import { BarListComponent } from './bar-list/bar-list.component';
import { ResizeComponent } from './resize/resize.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [
    BarComponent,
    BarListComponent,
    ResizeComponent,
    SortComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    SortComponent,
  ],
})
export class SortModule { }
