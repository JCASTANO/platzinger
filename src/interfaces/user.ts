export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'AppearOffline',
    Away = 'Away'
  }

export interface User {
    name: string,
    nick: string;
    subnick?: string;
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
    status: Status;
}