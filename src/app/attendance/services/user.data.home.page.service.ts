import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { WebsocketRejectService } from './websocket-reject.service';
import { WebsocketDetailsChangedService } from './websocket-details-changed.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataHomePageService {

  messages: Subject<any>;
  rejectMessages: Subject<any>;
  detailsChangedMessages: Subject<any>;

  constructor(
    private wsService: WebsocketService,
    private wsRejectService: WebsocketRejectService,
    private wsDetailsChangedService: WebsocketDetailsChangedService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));

    this.rejectMessages = <Subject<any>>wsRejectService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));

    this.detailsChangedMessages = <Subject<any>>wsDetailsChangedService
      .connect()
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
