import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginDetails: any = {};
    // signUpDetails;

    constructor( public router: Router ) { }

    ngOnInit() {
        // this.signUpDetails = JSON.parse(localStorage.getItem('signUpDetails'));
    }

    onSubmit() {
        if ( this.loginDetails.email === 'awiros@awiros.com' && this.loginDetails.password === 'awisys555' ) {
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('/attendance');
        } else {
            alert('wrong credential or register firstly');
        }
        console.log(this.loginDetails);
        // console.log(this.signUpDetails);
    }
}



