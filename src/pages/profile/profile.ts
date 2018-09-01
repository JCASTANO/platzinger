import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;

  constructor(public navCtrl: NavController, 
    public authservice: AuthService,
    public userService: UserService,
    public navParams: NavParams) {

      this.authservice.getStatus().subscribe(data => {
        
        this.userService.getById(data.uid).valueChanges().subscribe((result: User) => {
          this.user = result;
          console.log(this.user);
        },error => {
          console.log(error);
        });

      },error => {
        console.log(error);
      });
  }

  saveData() {
    this.userService.edit(this.user).then(data => {
      alert('Usuario editado');
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
