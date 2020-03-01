import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { WebsocketService } from '../../attendance/services/websocket.service';
import { AUTH_LEVELS } from 'src/app/configs/config.common';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private wsService: WebsocketService) {}

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
        localStorage.removeItem('userRoles');
        this.wsService.disconnectSocksdet();
        if ( isNullOrUndefined(localStorage.getItem('token')) ) {
            this.router.navigate(['/login']);
        }
    }

    logIn(loginDetails) {
        localStorage.setItem('token', loginDetails.token);
        // const tokenDetails = this.extractUserDetailsFromToken(loginDetails.token);
        const roles = [ Object.keys(AUTH_LEVELS)[Object.values(AUTH_LEVELS).indexOf(loginDetails.level)] ];
        
        localStorage.setItem('userRoles', JSON.stringify(roles));
        // if( tokenDetails ) {
        //     localStorage.setItem('tokenDetails', JSON.stringify(tokenDetails));
        // }
        
        if ( !isNullOrUndefined(localStorage.getItem('token')) ) {
            this.router.navigateByUrl('/attendance');
        }
    }

    // private extractUserDetailsFromToken(token) {        
    //     return window.atob(token.split('.')[1]);
    // }

    isAuthorized(allowedRoles) {
        const userRoles = localStorage.getItem('userRoles');
        const anyMatched = allowedRoles.filter(value => -1 !== userRoles.indexOf(value))
        let authorized = !!anyMatched.length;
        return authorized;
    }

    handleSession(response) {
        return ( !response.success && response.msg === 'Un-Authorized Access, expired session' );
    }
}
