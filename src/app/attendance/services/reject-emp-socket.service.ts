import { Injectable } from '@angular/core';
import { WebsocketRejectService } from './websocket-reject.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RejectEmpSocketService {

  rejectMessages: Subject<any>;

  constructor(private wsRejectService: WebsocketRejectService) {

    this.rejectMessages = <Subject<any>>wsRejectService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));
   }

   initConnection(msg) {
    this.rejectMessages.next(msg);
  }
}
