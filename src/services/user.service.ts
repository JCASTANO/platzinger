import { Status } from './../interfaces/user';
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable()
export class UserService {

    users: User[];

    constructor() {

        let usuario1: User = {
          name: 'Eduardo',
          nick: 'Eduardo',
          email: 'eduardo@gmail.com',
          friend: true,
          uid : 1,
          status: Status.Online
        };
    
        let usuario2: User = {
          name: 'Juan',
          nick: 'Juan',
          email: 'juan@gmail.com',
          friend: true,
          uid : 2,
          status: Status.Offline
        };
    
        let usuario3: User = {
          name: 'Angie',
          nick: 'Angie',
          email: 'angie@gmail.com',
          friend: false,
          uid : 3,
          status: Status.AppearOffline
        };

        let usuario4: User = {
          name: 'Danna',
          nick: 'Danna',
          email: 'danna@gmail.com',
          friend: false,
          uid : 4,
          status: Status.Busy
        };

        let usuario5: User = {
          name: 'Juancari',
          nick: 'Juancari',
          email: 'juancari@gmail.com',
          friend: false,
          uid : 5,
          status: Status.Away
        };


        this.users = [usuario1,usuario2,usuario3,usuario4,usuario5];
    }

    public getUsers() : User[] {
       return this.users; 
    }
}