import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ApiService } from '../attendance/services/api.service';
import { AuthGuard } from '../shared';
import { NotificationService } from '../attendance/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginDetails: any = {};
    // signUpDetails;

    constructor(
        public router: Router,
        private apiService: ApiService,
        private auth: AuthGuard,
        private notifyService: NotificationService) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/attendance');
        }
    }

    onSubmit() {
        this.apiService.login(this.loginDetails).subscribe((loginRes) => {

            if ( loginRes.success ) {
                console.log(loginRes);
                this.auth.logIn(loginRes);
                this.successToaster(loginRes.msg);
            } else {
                this.errorToaster(loginRes.msg);
            }
        });
    }

    errorToaster(message: string) {
        this.notifyService.showError(message,  '');
    }
    successToaster(message: string) {
        this.notifyService.showSuccess(message,  '');
    }
}



