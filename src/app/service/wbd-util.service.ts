import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileUpload} from 'primeng/primeng';

@Injectable()
export class WbdUtilService implements OnInit {

    userInfo: any = {};

    constructor(private router: Router) {
    };

    ngOnInit() {

    }

    tokenExpired(response: string) {
        if (response === 'invalid_token') {
            window.localStorage.removeItem(btoa('access_token'));
            window.localStorage.removeItem(btoa('tenantId'));
            window.localStorage.removeItem(btoa('user_id'));
            window.localStorage.removeItem(btoa('permissions'));
            window.localStorage.removeItem(btoa('view_permissions'));
            window.localStorage.removeItem(btoa('p_id'));
            window.localStorage.removeItem(btoa('user_type'));

            this.router.navigate(['/login']);
        }
    }

    public logout() {
        window.localStorage.removeItem(btoa('access_token'));
        window.localStorage.removeItem(btoa('tenantId'));
        window.localStorage.removeItem(btoa('user_id'));
        window.localStorage.removeItem(btoa('permissions'));
        window.localStorage.removeItem(btoa('view_permissions'));
        window.localStorage.removeItem(btoa('p_id'));
        window.localStorage.removeItem(btoa('user_type'));
    }
}
