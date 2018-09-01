import { SearchPipe } from './../pipes/search.pipe';
import { UserService } from './../services/user.service';
import { AboutPageModule } from './../pages/about/about.module';
import { ConversationPageModule } from './../pages/conversation/conversation.module';
import { LoginPageModule } from './../pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../services/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBFrzwF-GZHDc97UEgKHP2u69YU2d53nSY",
  authDomain: "ionicadvancedplatzi.firebaseapp.com",
  databaseURL: "https://ionicadvancedplatzi.firebaseio.com",
  projectId: "ionicadvancedplatzi",
  storageBucket: "ionicadvancedplatzi.appspot.com",
  messagingSenderId: "718585153070"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    ConversationPageModule,
    ProfilePageModule,
    AboutPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
