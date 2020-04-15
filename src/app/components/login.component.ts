import {Component} from '@angular/core';
import {RequestsService} from '../service/requests.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {APIURLConstants} from '../util/api.url.constants';
import {SharedService} from '../service/shared.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WbdUtilService} from "../service/wbd-util.service";

@Component({
    selector: 'login-component',
    templateUrl: '../templates/login.template.html',
    styleUrls: ['../style/login-style.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ])
    ]

})
export class LoginComponent {
    username: string;
    password: string;
    tenantId: string;
    errorMessage: string;

    constructor(private requestsService: RequestsService,
                private router: Router,
                public wbdUtilService: WbdUtilService,
                public sharedService: SharedService) {
    };

    ngOnInit() {
        if (window.localStorage.getItem(btoa('access_token'))) {
            this.router.navigate(['/document-library']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    login(form: NgForm) {
        if (form.valid) {
            this.requestsService.postRequestOauth2Token(
                APIURLConstants.OAUTH_TOKEN_API
                , {
                    'userName': this.username + '__' + this.tenantId,
                    'password': this.password,
                    'grantType': 'password',
                })
                .subscribe(
                    (response: Response) => {
                        if (response['token_type'] === 'bearer') {
                            window.localStorage.setItem(btoa('access_token'), btoa(response['access_token']));
                            window.localStorage.setItem(btoa('refresh_token'), btoa(response['refresh_token']));
                            window.localStorage.setItem(btoa('expire_in'), btoa(response['expires_in']));
                            window.localStorage.setItem(btoa('tenantId'), btoa(this.tenantId));

                            this.requestsService.postRequest(
                                APIURLConstants.LOGIN_API
                                , {
                                    'userName': this.username,
                                    'password': this.password,
                                })
                                .subscribe(
                                    (response: Response) => {
                                        if (response['responseCode'] === 'USR_AUTH_SUC_01') {
                                            let obj = JSON.parse(JSON.stringify(response['responseData']));
                                            window.localStorage.setItem(btoa('permissions'),
                                                JSON.stringify(this.wbdUtilService.extractPermissions(obj.uRole.rPermissions)));
                                            obj.uRole.rPermissions = [];
                                            window.localStorage.setItem(btoa('user-info'), JSON.stringify(obj));
                                            this.wbdUtilService.userInfo = JSON.parse(JSON.stringify(response['responseData']));
                                            let lang = this.wbdUtilService.userInfo.uProfile.upLanguage;
                                            this.sharedService.timeoutSubscribed = false;
                                            this.router.navigate(['/document-library']);
                                            if (lang != 'en') {
                                                this.wbdUtilService.changeLayoutOrientation(lang);
                                            }
                                        } else {
                                            this.router.navigate(['/login']);
                                            window.localStorage.removeItem(btoa('access_token'));
                                            window.localStorage.removeItem(btoa('refresh_token'));
                                            window.localStorage.removeItem(btoa('expire_in'));
                                            window.localStorage.removeItem(btoa('tenantId'));
                                            window.localStorage.removeItem(btoa('user-info'));

                                            this.errorMessage = response['responseMessage'];
                                        }
                                    },
                                    (error: any) => {
                                        this.errorMessage = error.error.error_description;
                                        this.wbdUtilService.tokenExpired(error.error.error);
                                    });
                        } else {
                            this.errorMessage = response['responseMessage'];
                            window.localStorage.removeItem(atob('access_token'));
                            window.localStorage.removeItem(atob('refresh_token'));
                            window.localStorage.removeItem(atob('expire_in'));
                            window.localStorage.removeItem(atob('tenantId'));
                            window.localStorage.removeItem(atob('user-info'));
                        }
                    }, (error: any) => {
                        if (error.error.error === 'invalid_grant') {
                            this.errorMessage = 'Invalid username or password.';
                        } else if (error.error.error === 'unauthorized') {
                            this.errorMessage = 'You have entered a wrong tenantId.';
                        } else {
                            this.errorMessage = error.error.error_description;
                            this.wbdUtilService.tokenExpired(error.error.error);
                        }
                    });
        } else {
            this.errorMessage = 'Fields are required.';
        }
    }
}
