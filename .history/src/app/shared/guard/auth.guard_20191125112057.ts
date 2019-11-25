import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        const token = localStorage.getItem('token');

        if (!isNullOrUndefined(token)) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    isLoggedIn () {
        return !isNullOrUndefined(localStorage.getItem('token'));
    }

    logOut () {
        localStorage.removeItem('token');
    }

    logIn(token) {
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/attendance');
    }
}
