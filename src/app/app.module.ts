import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.component';
import { RegisterPage } from './register/register.component';
import { ResetPasswordPage } from './reset-password/reset-password.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { routing } from './app.routing';


@NgModule({
  declarations: [AppComponent, HomePage, LoginPage, RegisterPage, ResetPasswordPage],
  entryComponents: [AppComponent, HomePage, LoginPage, RegisterPage, ResetPasswordPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    routing,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [Location, SplashScreen, StatusBar, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}

