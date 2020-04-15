import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {FileUpload} from 'primeng/primeng';

@Injectable()
export class WbdUtilService {
    userInfo: any = {};

    constructor(private router: Router) {
    };

    ngOnInit() {

    }

    tokenExpired(response: string) {
        if (response === 'invalid_token') {
            window.localStorage.removeItem(btoa('access_token'));
            window.localStorage.removeItem(btoa('refresh_token'));
            window.localStorage.removeItem(btoa('expire_in'));
            window.localStorage.removeItem(btoa('tenantId'));
            window.localStorage.removeItem(btoa('user-info'));
            window.localStorage.removeItem(btoa('permissions'));
            window.localStorage.removeItem(btoa('default-account'));

            this.router.navigate(['/login']);
        }
    }

    public logout() {
        window.localStorage.removeItem(btoa('access_token'));
        window.localStorage.removeItem(btoa('refresh_token'));
        window.localStorage.removeItem(btoa('expire_in'));
        window.localStorage.removeItem(btoa('tenantId'));
        window.localStorage.removeItem(btoa('user-info'));
        window.localStorage.removeItem(btoa('permissions'));
        window.localStorage.removeItem(btoa('default-account'));

        if (this.changeLayoutOrientation('en')) {
            this.router.navigate(['/login']);
        }
    }

    updateLoggedInUserInformation(data: any) {
        window.localStorage.setItem(btoa('user-info'), JSON.stringify(data));
        this.userInfo = JSON.parse(JSON.stringify(data));
    }

    updateOrganizationInformation(data: any) {
        let userInfo = JSON.parse(localStorage.getItem(btoa('user-info')));
        userInfo.uOrganization = JSON.parse(JSON.stringify(data));
        localStorage.setItem(btoa('user-info'), JSON.stringify(userInfo));
        this.userInfo = userInfo;
    }

    updateOrganizationFiscalYearEditable(isEditable: boolean) {
        let userInfo = JSON.parse(localStorage.getItem(btoa('user-info')));
        userInfo.uOrganization.fiscalInfoEditable = isEditable;
        localStorage.setItem(btoa('user-info'), JSON.stringify(userInfo));
        this.userInfo = userInfo;
    }

    changeLayoutOrientation(lang: string): boolean {
        let isSuccess = false;
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
        const layoutLinkGlobal: HTMLLinkElement = <HTMLLinkElement>document.getElementById('global-css');
        const mainHtml = document.getElementsByTagName('html');

        if (lang === 'en') {
            mainHtml[0].removeAttribute('dir');
            mainHtml[0].removeAttribute('lang');

            layoutLink.href = 'assets/layout/css/layout-lightblue.css';
            layoutLinkGlobal.href = 'assets/layout/css/global.css';
            isSuccess = true;
        } else {
            let dirAtt, langAtt;
            dirAtt = document.createAttribute('dir');
            dirAtt.value = 'rtl';
            langAtt = document.createAttribute('lang');
            langAtt.value = 'ar';
            mainHtml[0].setAttributeNode(dirAtt);
            mainHtml[0].setAttributeNode(langAtt);

            layoutLink.href = 'assets/layout/css/rtl-layout-lightblue.css';
            layoutLinkGlobal.href = 'assets/layout/css/rtl-global.css';
            isSuccess = false;
        }
        return isSuccess;
    }

    public getLoggedInUser(): any {
        return JSON.parse(window.localStorage.getItem(btoa('user-info')));
    }

    public extractPermissions(permissions: any[]): string[] {
        return permissions.map(p => btoa(p.pPermission));
    }

    public getShortString(str: string, length: number): string {
        let shortString: string = '';
        if (str.length > length) {
            shortString = str.substr(0, length) + '...';
        } else {
            shortString = str;
        }
        return shortString;
    }

    public getSizeInKiloBytes(file: File) {
        return file ? file.size / 1024 : 0;
    }

    public removeFile(file: File, uploader: FileUpload) {
        const index = uploader.files.indexOf(file);
        uploader.remove(null, index);
    }
}
