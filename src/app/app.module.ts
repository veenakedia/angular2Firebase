import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
//import {FirebaseService} from './services/firebase.services';


export const firebaseConfig = {
   apiKey: "AIzaSyCow5eqzhNkaISB9DAoO_QkJYegokz_cAE",
    authDomain: "businesscontacts-91967.firebaseapp.com",
    databaseURL: "https://businesscontacts-91967.firebaseio.com",
    projectId: "businesscontacts-91967",
    storageBucket: "businesscontacts-91967.appspot.com",
    messagingSenderId: "1076596395166"
} 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
