import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { AnalyticsService } from './app/shared/analytics.service';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

/* The AppComponent is the main component and was bootstrapped in the
 * AppModule. When turning it to standalone, this file has to be changed
 * in order to tell Angular which component to bootstrap.
 * With that, the whole AppModule file can be deleted.
 * Obs.: the BrowserModule that was present in the imports is imported
 * automatically when calling the function below. */
bootstrapApplication(AppComponent,{
  providers: [
    /* This is another way of declaring a service globally when using
     * standalone components. This is the equivalent of declaring the
     * service in the providers of the AppModule.
     * This is usually not needed, because services will mainly use the
     * "providedIn: 'root'" declaration in their own files. */
    // AnalyticsService
  ]
});