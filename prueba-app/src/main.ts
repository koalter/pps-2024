import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"lcea-pps-2024","appId":"1:734689715429:web:12d4e3ccae20307c14600c","storageBucket":"lcea-pps-2024.appspot.com","apiKey":"AIzaSyC61EV8x2HOtDpZTaadcWVTJy3cNEQYx94","authDomain":"lcea-pps-2024.firebaseapp.com","messagingSenderId":"734689715429","measurementId":"G-KYCW5L1QLZ"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
