import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { CurrentUser } from './shared/config/user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {

        if (localStorage.getItem('currentMRPUser')) {
           
            CurrentUser.USER_AUTH_TOKEN = localStorage.getItem("currentMRPUserToken");
            return true;
        }
      
        this.router.navigate(['login']);
        return false;
    }
}