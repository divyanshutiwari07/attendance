import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SOCKET_EVENTS } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UserDataHomePageService {

  messages: Subject<any>;
  rejectMessages: Subject<any>;
  detailsChangedMessages: Subject<any>;

  constructor(
    private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect(SOCKET_EVENTS.NEW_SERVER_EVENT)
      .pipe(map((response: any): any => {
        return response;
      }));

    this.rejectMessages = <Subject<any>>wsService
      .connect('event_reject_attendance')
      .pipe(map((response: any): any => {
        return response;
      }));

    this.detailsChangedMessages = <Subject<any>>wsService
      .connect('event_details_changed')
      .pipe(map((response: any): any => {
        return response;
      }));
   }

   initConnection(msg) {
    this.messages.next(msg);
    this.rejectMessages.next(msg);
    this.detailsChangedMessages.next(msg);
  }

}
