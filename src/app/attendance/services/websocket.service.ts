import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { config } from '../../config';
import {SOCKET_EVENTS} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private socket;

  constructor() {}

  // connect(): Rx.Subject<MessageEvent> {
  //   const token = localStorage.getItem('token');
  //   const payload = token.split('.')[1];
  //   const obj = window.atob(payload);

  //   this.socket = io(config.SERVER_ADDRESS_REALTIME);

  //   const observable = new Observable(observer => {
  //       this.socket.on(SOCKET_EVENTS.NEW_SERVER_EVENT, (data) => {
  //         observer.next(data);
  //       });
  //       return () => {
  //         this.socket.disconnect();
  //       };
  //   });

  //   const observer = {
  //       next: (data: Object) => {
  //         this.socket.emit(SOCKET_EVENTS.USER_JOINED_EVENT,  JSON.parse(obj).id);
  //       },
  //   };

  //   return Rx.Subject.create(observer, observable);
  // }
}
