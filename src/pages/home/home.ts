import { User } from './../../interfaces/user';
import { LoginPage } from './../login/login';
import { ConversationPage } from './../conversation/conversation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[] = [];

  constructor(private navCtrl: NavController) {
    let usuario1: User = {
      nick: 'Eduardo',
      email: 'a@gmail.com',
      friend: true,
      uid : 1
    };

    let usuario2: User = {
      nick: 'Juan',
      email: 'juan@gmail.com',
      friend: true,
      uid : 1
    };

    this.friends = [usuario1,usuario2];
  }

  goToConversation() {
    this.navCtrl.push(ConversationPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
