import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // FormsModule is only needed for the template driven approach.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
