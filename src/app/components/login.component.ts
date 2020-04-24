import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../service/requests.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SharedService} from '../service/shared.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {APIURLConstants} from "../util/api.url.constants";

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
export class LoginComponent implements OnInit {

    tenantId: string;
    username: string;
    password: string;
    errorMessage: string;
    remember: boolean = false;

    constructor(private requestsService: RequestsService,
                private router: Router,
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
            if (window.localStorage.getItem(btoa('access_token'))) {
                this.router.navigate(['/document-library']);
                return;
            }
            this.requestsService.postRequestAccessToken(
                APIURLConstants.LOGIN_API_URL
                , {
                    'tenantId': this.tenantId,
                    'username': this.username,
                    'password': this.password,
                })
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'USR_AUTH_SUC_01') {
                            let obj = JSON.parse(JSON.stringify(response['responseData']));

                            window.localStorage.setItem(btoa('access_token'), btoa(this.username + ':' + this.password));
                            window.localStorage.setItem(btoa('tenantId'), btoa(this.tenantId));
                            window.localStorage.setItem(btoa('user-info'), JSON.stringify(obj));
                            this.sharedService.isUserLoggedIn = true;

                            if (this.remember) {
                                window.localStorage.setItem(this.username, this.password);
                            }
                            this.router.navigate(['/document-library']);
                        } else {
                            this.router.navigate(['/login']);
                            this.errorMessage = response['responseMessage'];
                        }
                    }, (error: any) => {
                        if (error.status === 401) {
                            this.errorMessage = 'Invalid Credentials.';
                        } else {
                            this.errorMessage = 'Internal Server Error, please contact administrator.';
                        }
                    });
        } else {
            this.errorMessage = 'Fields are required.';
        }
    }
}
