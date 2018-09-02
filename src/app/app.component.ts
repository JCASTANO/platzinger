import { AboutPage } from './../pages/about/about';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AuthService } from '../services/auth';
import {User} from "../interfaces/user";
import {RequestService} from "../services/request";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; 

  pages: Array<{title: string, component: any}>;

  user: any;
  requests: any;
  mailsShown: any = [];
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private requestService: RequestService,
              public userService: UserService,
              public alertCtrl: AlertController,
              private authService: AuthService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'About', component: AboutPage }
    ];

    this.authService.getStatus().subscribe((result) => {
      if(result && result.uid) {
        this.userService.getById(result.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          this.getFriendRequests();
        });
      }
    });

  }

  getFriendRequests() {
    this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe( (requests: any) => {
      this.requests = requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        if(this.mailsShown.indexOf(r.sender.email) === -1) {
          this.mailsShown.push(r.sender.email);
          this.showRadio(r);
        }
      });
    });
  }
   showRadio(r) {
    let alert = this.alertCtrl.create();
    alert.setTitle('¡Solicitud de Amistad!');
    alert.setMessage(r.sender.email + 'te ha invitado a ser su amigo, deseas aceptar?');
     alert.addInput({
      type: 'radio',
      label: 'Sí.',
      value: 'yes',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'No, gracias.',
      value: 'no',
      checked: false
    });
     alert.addButton({
      text: 'OK',
      handler: data => {
        if (data === 'yes') {
          this.requestService.setRequestStatus(r, 'accepted').then(() => {
            this.userService.addFriend(this.user.uid, r.sender.uid);
          });
        } else {
          this.requestService.setRequestStatus(r, 'rejected').then(() => {});
        }
      }
    });
    alert.addButton({
      text: 'Decidir más Tarde',
      handler: data => {
        this.requestService.setRequestStatus(r, 'decide_later').then(() => {});
      }
    });
    return alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  logout() {
    this.authService.logOut().then(r => {
      console.log(r);
      this.nav.setRoot(LoginPage);
    }).catch (error => {
      console.log(error);
    });
  }
}
