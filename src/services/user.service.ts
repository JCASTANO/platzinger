import { Status } from './../interfaces/user';
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable()
export class UserService {

    users: User[];

    constructor() {

        let usuario1: User = {
          nick: 'Eduardo',
          email: 'eduardo@gmail.com',
          friend: true,
          uid : 1,
          status: Status.Online
        };
    
        let usuario2: User = {
          nick: 'Juan',
          email: 'juan@gmail.com',
          friend: true,
          uid : 2,
          status: Status.Online
        };
    
        let usuario3: User = {
          nick: 'Angie',
          email: 'angie@gmail.com',
          friend: false,
          uid : 3,
          status: Status.Offline
        };

        this.users = [usuario1,usuario2,usuario3];
    }

    public getUsers() : User[] {
       return this.users; 
    }
}