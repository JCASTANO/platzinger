import { UserService } from './../../services/user.service';
import { User, Status } from './../../interfaces/user';
import { LoginPage } from './../login/login';
import { ConversationPage } from './../conversation/conversation';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[] = [];
  query: string;
  offlineStatus: Status[];
  user: User;

  constructor(public navCtrl: NavController,public userService: UserService,public navParams: NavParams) {
    this.userService.get().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
      let email = this.navParams.get('email');
      this.user = this.friends.find(friend => friend.email === email);
    });
    this.offlineStatus = [Status.Offline, Status.AppearOffline];

    /* let usuario1: User = {
      name: 'Eduardo',
      nick: 'Eduardo',
      email: 'eduardo@gmail.com',
      friend: true,
      uid : Date.now(),
      status: Status.Online
    };
    this.userService.add(usuario1); */
  }

  initConversation(user: User) {
    this.navCtrl.push(ConversationPage,{"user": user});
  }

  goToConversation() {
    this.navCtrl.push(ConversationPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  /* getItems(ev: any) {
    // Reset items back to all of the items
    this.friends = this.userService.getUsers();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.friends = this.friends.filter((item) => {
        return (item.nick.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  } */

  getIconByStatus (status) {
    let icon = ''

    switch (status) {
      case Status.Online:
        icon = 'logo_live_online';
        break;
      case Status.Offline:
        icon = 'logo_live_offline';
        break;
      case Status.Busy:
        icon = 'logo_live_busy';
        break;
      case Status.Away:
        icon = 'logo_live_away';
        break;
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline';
        break;
    }

    return icon;
  }

}
