import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { RestClient } from '../common/rest.client';
import { config } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public registeredUsers = {};

  constructor(private http: RestClient) {}

  private saveRegisterData(registerUserData) {
    this.registeredUsers = registerUserData;
  }

  public loadRegisterUsers(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      if ( !Object.keys(this.registeredUsers).length ) {
          this.http.get(config.LIST_OF_REGISTER_URL, {}).subscribe(response => {
            this.saveRegisterData(response);
            observer.next(response);
            observer.complete();
          });
      } else {
        observer.next(this.registeredUsers);
      }
    });
  }
}
