import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ApiService } from '../attendance/services/api.service';
import { AuthGuard } from '../shared';
import { NotificationService } from '../../services/notification.service';

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
        // if (this.auth.isLoggedIn()) {
        //     this.router.navigateByUrl('/attendance');
        // }
    }

    onSubmit() {

        // const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYXdpX2NsaWVudF9pZCI6MiwiYXdpcm9zIjoicGl5dXNoQGF3aWRpdC5jb20iLCJsZXZlbCI6ImF3aV91c2VyIiwiaWF0IjoxNTc0NDE1MzU1LCJleHAiOjE1NzQ1MDE3NTV9.uFkIrv3bK167iJncOI-xnKQQj7Kw3Wcwe3YpLftdM3w";
        // this.auth.logIn(token);


        this.apiService.login(this.loginDetails).subscribe((loginRes) => {
            console.log(loginRes);
            if ( loginRes.success ) {
                this.auth.logIn(loginRes.token);
            } else {
                alert(loginRes.msg);
            }
        });
    }

    successToaster() {
        console.log('yes');
        this.notifyService.showSuccess('Data Saved successfully !!',  'PoC Data');
      }
}



