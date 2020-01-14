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
                this.auth.logIn(loginRes.token);
                this.successToaster();
            } else {
                alert(loginRes.msg);
            }
        });
    }

    successToaster() {
        console.log('yes');
        this.notifyService.showSuccess('Login Successfully !!', '');
    }
}



