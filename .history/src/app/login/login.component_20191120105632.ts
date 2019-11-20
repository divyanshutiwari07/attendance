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
    signUpDetails;

    constructor( public router: Router ) { }

    ngOnInit() {
        this.signUpDetails = JSON.parse(localStorage.getItem('signUpDetails'));
    }

    onSubmit() {
        if (this.signUpDetails !== null) {
            if (this.loginDetails.email === this.signUpDetails.email && this.loginDetails.password === this.signUpDetails.password) {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigateByUrl('/dashboard');
            } else {
                console.log('please enter right credential');
                alert('please enter right credential');
            }
        } else if ( this.loginDetails.email === 'divyanshutiwari07@gmail.com' && this.loginDetails.password === 'awisys555' ) {
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigateByUrl('/dashboard');
        } else {
            alert('wrong credential or register firstly');
        }
        console.log(this.loginDetails);
        console.log(this.signUpDetails);
    }
}



