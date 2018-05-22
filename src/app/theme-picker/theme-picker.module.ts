import { MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { ThemePickerComponent } from './theme-picker.component';

@NgModule({
  declarations: [ThemePickerComponent],
  imports: [MatButtonModule],
  exports: [ThemePickerComponent],
})
export class ThemePickerModule {}
