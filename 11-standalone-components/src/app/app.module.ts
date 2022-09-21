import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  /* From the moment that I turn a component into standalone, it *cannot* be
   * present in the "declarations" anymore. But since the standalone component
   * is not being imported anywhere, it has to
   * be present among the "imports" of the AppModule */
  // declarations: [AppComponent, WelcomeComponent, DetailsComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
