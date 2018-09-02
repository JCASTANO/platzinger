export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'AppearOffline',
    Away = 'Away'
  }

export interface User {
    nick: string;
    age?: number;
    active: boolean;
    email: string;
    uid: any;
    status: Status;
    avatar?: string;
    adress?: string;
    friends?: any[];
}