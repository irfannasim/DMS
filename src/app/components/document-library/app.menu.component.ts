import {Component, OnInit} from '@angular/core';
import {ContentComponent} from "./content.component";
import {Router} from "@angular/router";
import {WbdUtilService} from "../../service/wbd-util.service";
import {SharedService} from "../../service/shared.service";
import {MenuItem} from "primeng";

@Component({
    selector: 'app-menu',
    templateUrl: '../../templates/document-library/app.menu.template.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];
    newOptions: MenuItem[] = [
        {
            label: 'Folder',
            icon: '',
            routerLink: ['/document-library'],
        },
        {
            label: 'File Upload',
            icon: '',
            routerLink: ['/document-library'],
        },
        {
            label: 'Folder Upload',
            icon: '',
            routerLink: ['/document-library'],
        },
        {
            label: 'Link for External Upload',
            icon: '',
            routerLink: ['/document-library'],
        },
    ];

    constructor(public content: ContentComponent,
                public router: Router,
                public wbdUtilService: WbdUtilService,
                public sharedService: SharedService) {
    }

    ngOnInit() {
        if (!window.localStorage.getItem(btoa('access_token'))) {
            this.router.navigate(['/login']);
        } else {
            this.buildMenu();
        }
    }

    private buildMenu() {
        if (this.router.url.split('/')[1] === 'document-library' || this.router.url.split('/')[1] === 'profile') {
            if (this.wbdUtilService.userInfo.uOrganization) {
                this.model = [{label: 'All Files', icon: 'fa fa-folder', routerLink: ['/document-library']},
                    {label: 'Shared By Me', icon: 'fa fa-folder', routerLink: ['/shared-by-me']},
                    {label: 'Shared With Me', icon: 'fa fa-folder', routerLink: ['/shared-with-me']},
                    {label: 'Recents', icon: 'fa fa-folder', routerLink: ['/recents']},
                    {label: 'Favourites', icon: 'fa fa-star', routerLink: ['/favourites']},
                    {label: 'Trash', icon: 'fa fa-trash', routerLink: ['/trash']},
                    {label: 'Admin Console', icon: 'fa fa-cog', routerLink: ['/admin-console']}
                ];
            } else {
                this.sharedService.userLoggedIn.subscribe(res => {
                    if (res) {
                        this.model = [{label: 'All Files', icon: 'icon-dashboard', routerLink: ['/document-library']},
                            {label: 'Shared By Me', icon: 'icon-dashboard', routerLink: ['/shared-by-me']},
                            {label: 'Shared With Me', icon: 'icon-dashboard', routerLink: ['/shared-with-me']},
                            {label: 'Recents', icon: 'icon-dashboard', routerLink: ['/recents']},
                            {label: 'Favourites', icon: 'icon-dashboard', routerLink: ['/favourites']},
                            {label: 'Trash', icon: 'fa fa-trash', routerLink: ['/trash']},
                            {label: 'Admin Console', icon: 'icon-dashboard', routerLink: ['/admin-console']}
                        ];
                    }
                });
            }
        } else {
            this.model = [
                {label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/admin-console']},
                {label: 'Users', icon: 'fa fa-user', routerLink: ['/admin-console/user']},
                {label: 'Users Content', icon: 'fa fa-user', routerLink: ['/admin-console/user-content']},
                {label: 'Account Setting', icon: 'fa fa-cog', routerLink: ['/admin-console/account-setting']},
            ];
        }
    }
}
