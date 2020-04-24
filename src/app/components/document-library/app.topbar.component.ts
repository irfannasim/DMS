import {Component, OnInit} from '@angular/core';
import {ContentComponent} from "./content.component";
import {APIURLConstants} from "../../util/api.url.constants";
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";
import {SharedService} from "../../service/shared.service";
import {Router} from "@angular/router";
import {UserUpdateService} from "../../service/user.update.service";

@Component({
    selector: 'app-topbar',
    templateUrl: '../../templates/document-library/app.topbar.template.html'
})
export class AppTopBarComponent implements OnInit {

    constructor(public content: ContentComponent,
                private userUpdateService: UserUpdateService,
                private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService,
                private sharedService: SharedService,
                private router: Router) {
    }

    ngOnInit() {
        if (window.localStorage.getItem(btoa('access_token'))) {
            this.requestsService.getRequest(
                APIURLConstants.LOGGED_IN_USER_URL + localStorage.getItem(btoa('access_token')))
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'USR_SUC_03') {
                            if (window.localStorage.getItem(btoa('user-info'))) {
                                let obj = JSON.parse(JSON.stringify(response['responseData']));
                                this.wbdUtilService.userInfo = obj;
                                window.localStorage.setItem(btoa('user-info'), JSON.stringify(obj));

                                this.sharedService.isUserLoggedIn = true;
                                this.sharedService.userLoggedIn.next(true);
                                this.userUpdateService.newSubject.subscribe(
                                    profileImgUrl => this.wbdUtilService.userInfo.profileImg = profileImgUrl
                                );
                            } else {
                                this.wbdUtilService.logout();
                            }
                        }

                    },
                    (error: any) => {
                        this.wbdUtilService.tokenExpired(error.error.error);
                    }
                );
            // when API is in process - synchronizing
            this.wbdUtilService.userInfo = JSON.parse(window.localStorage.getItem(btoa('user-info')));
        }
    }

}
