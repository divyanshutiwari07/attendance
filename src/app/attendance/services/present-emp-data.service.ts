// import { Injectable } from '@angular/core';
// import { Observable, Observer } from 'rxjs';
// import { RestClient } from '../common/rest.client';
// import { config } from '../../config';

// @Injectable({
//   providedIn: 'root'
// })
// export class PresentEmpDataService {

//   public presentEmp = {};

//   constructor(private http: RestClient) {}

//   private savePresentEmpData(presentEmpData) {
//     this.presentEmp = presentEmpData;
//   }

//   public loadPresentEmployees(req): Observable<any> {
//     return Observable.create((observer: Observer<any>) => {
//       if ( !Object.keys(this.presentEmp).length ) {
//           this.http.get(config.TODAYS_ATTENDANCE, req).subscribe(response => {
//             this.savePresentEmpData(response);
//             observer.next(response);
//             observer.complete();
//           });
//       } else {
//         observer.next(this.presentEmp);
//       }
//     });
//   }
// }
