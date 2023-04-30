import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {provideAuth,getAuth} from '@angular/fire/auth';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import {provideStorage,getStorage}  from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {defineCustomElements} from '@ionic/pwa-elements/loader'
import {AngularFireMessagingModule} from '@angular/fire/compat/messaging'
import { firebaseConfig } from './model/firebaseConfig';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}),HttpClientModule,provideFirebaseApp(()=> initializeApp(firebaseConfig.firebase)),
    provideAuth(()=> getAuth()),
    provideFirestore(()=> getFirestore()),
    provideStorage(()=>getStorage()),
    AngularFireMessagingModule,
    ReactiveFormsModule,
 
   
    
    ),
    provideRouter(routes),
  ],
});
defineCustomElements(window);
