import { UserService } from './../../services/user.service';
import { User, Status } from './../../interfaces/user';
import { LoginPage } from './../login/login';
import { ConversationPage } from './../conversation/conversation';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { RequestService } from '../../services/request';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: User[] = [];
  query: string;
  offlineStatus: Status[];
  user: User;

  constructor(public navCtrl: NavController,public userService: UserService,public navParams: NavParams,
    public alertCtrl: AlertController, public requestService: RequestService, 
    public authService: AuthService,public toastCtrl: ToastController) {
    this.offlineStatus = [Status.Offline, Status.AppearOffline];

    this.authService.getStatus().subscribe((result) => {
      if(result && result.uid) {
        this.userService.getById(result.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          this.user.friends = Object.keys(this.user.friends).map(key => this.user.friends[key]);
        });
      }
    });
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

  sendRequest() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar Amigo',
      message: "Ingresa el email del amigo que deseas agregar. ¡Le enviaremos tu solicitud!",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {text: 'Cancel',
          handler: data => {
            console.log(data);
          }
        },
        {text: 'Save',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.requestService.createRequest(request).then((data) => {
              let toast = this.toastCtrl.create({
                message: 'Solicitud Enviada',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
