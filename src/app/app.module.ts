import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import {
  AlgorithmControlComponent,
  AlgorithmDisplayComponent,
  ComplexityComponent,
  HeaderComponent,
  ResizeButtonComponent,
  SettingsComponent,
} from './components'
import { HoldDirective, VertResizeDirective } from './directives'

import { MaterialModule } from './material.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmControlComponent,
    AlgorithmDisplayComponent,
    ComplexityComponent,
    HeaderComponent,
    ResizeButtonComponent,
    SettingsComponent,
    HoldDirective,
    VertResizeDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
