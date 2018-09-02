import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  currentPictureId: any = {};
  location: any;

  constructor(public navCtrl: NavController, 
    public authservice: AuthService,
    public userService: UserService,
    public camera: Camera,
    public geolocation: Geolocation,
    public platform: Platform,
    public toastCtrl: ToastController,
    public httpClient: HttpClient,
    public navParams: NavParams) {

      this.authservice.getStatus().subscribe(data => {
        if(data && data.uid) {
          this.userService.getById(data.uid).valueChanges().subscribe((result: User) => {
            this.user = result;
          },error => {
            console.log(error);
          });
        }
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

  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL, //base 64
        encodingType: this.camera.EncodingType.JPEG, //jepg
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true, //acomodar la camara
        allowEdit: false //habilitar programas de edicion
      };
      cameraOptions.sourceType = (source == 'camera') ?  this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = `data:image/jpeg;base64,${result}`;
      //console.log(image);
      //this.camera.cleanup();
      //Se aplica solo cuando el valor de Camera.sourceType es igual a Camera.PictureSourceType.CAMERA 
      //y Camera.destinationType es igual a Camera.DestinationType.FILE_URI.

      this.currentPictureId = Date.now();
      this.userService.uploadPicture(this.currentPictureId + '.jpg', image).then((data) => {
        this.userService.getDownloadURL(this.currentPictureId + '.jpg').subscribe((url) => {
          this.user.avatar = url;
          let toast = this.toastCtrl.create({
            message: 'Foto subida',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          console.log(this.user.avatar);
        }, (error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });

    } catch (e) {
      console.error(e);
    }
  }

  getLocation() {

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+resp.coords.latitude+','+resp.coords.longitude+'&sensor=true/false').subscribe((data: any) => {
          alert(data.results[0].formatted_address);
          this.user.adress = data.results[0].formatted_address;
        }, (error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error.message);
        console.log('Error getting location', JSON.stringify(error));
      });
    });
  }
}
