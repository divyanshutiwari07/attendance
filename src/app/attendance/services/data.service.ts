import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private messageSource = new BehaviorSubject('default message');
  // currentMessage = this.messageSource.asObservable();

  // constructor() { }

  // changeMessage(message: string) {
  //   this.messageSource.next(message);
  // }

  private registerSharingData: any;

  // Observable string source
  private registerDataStringSource = new BehaviorSubject<string>(this.registerSharingData);

  // Observable string stream
  registerDataString$ = this.registerDataStringSource.asObservable();

  constructor() { }

  public saveRegisterData(registerUserData) {
    console.log('save data function called ' + registerUserData + this.registerSharingData);
    this.registerSharingData = registerUserData;
    this.registerDataStringSource.next(this.registerSharingData);
  }
}
