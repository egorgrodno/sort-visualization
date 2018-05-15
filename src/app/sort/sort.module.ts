import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgModule, Provider } from '@angular/core';

import { BarComponent } from './bar/bar.component';
import { BarListComponent } from './bar-list/bar-list.component';
import { ConfirmArraySizeComponent } from './confirm-array-size/confirm-array-size.component';
import { MouseHoldDirective } from './mouse-hold/mouse-hold.directive';
import { ResizeComponent } from './resize/resize.component';
import { SortComponent } from './sort.component';

@NgModule({
  entryComponents: [
    ConfirmArraySizeComponent,
  ],
  declarations: [
    BarComponent,
    BarListComponent,
    ConfirmArraySizeComponent,
    MouseHoldDirective,
    ResizeComponent,
    SortComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { panelClass: 'mat-typography', hasBackdrop: true },
    },
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
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
