import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEI3r2acIEFwRXrpl_WMDU2Hr87z99CxI",
  authDomain: "flightsreservation-app.firebaseapp.com",
  projectId: "flightsreservation-app",
  storageBucket: "flightsreservation-app.appspot.com",
  messagingSenderId: "601218559509",
  appId: "1:601218559509:web:4be2a2efe13cfce38ce81c"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
]
};
