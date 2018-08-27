import { UserService } from './../../services/user.service';
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
  query: string;

  constructor(public navCtrl: NavController,public userService: UserService) {
    this.friends = this.userService.getUsers();
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

  getItems(ev: any) {
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
  }

}
