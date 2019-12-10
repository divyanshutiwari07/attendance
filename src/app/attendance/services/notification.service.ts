import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title , {
      timeOut : 2000,
      closeButton: true,
      // enableHtml: true,
      positionClass: 'toast-top-center'
    });

  }
  showError(message, title) {

    this.toastr.error(message, title , {
      timeOut : 2000,
      closeButton: true,
      // enableHtml: true,
      positionClass: 'toast-top-center'
    });

  }


  // showSuccessWithTimeout(message, title, timespan){
  //   this.toastr.success(message, title , {
  //     timeOut : timespan
  //   });
  // }

  // showHTMLMessage(message, title) {
  //   this.toastr.success(message, title, {
  //     enableHtml : true
  //   });
  // }
}
