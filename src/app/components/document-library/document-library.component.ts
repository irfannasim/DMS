import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";
import {APIURLConstants} from "../../util/api.url.constants";
import {Router} from "@angular/router";

@Component({
    selector: 'document-library-component',
    templateUrl: '../../templates/document-library/document.library.template.html'
})
export class DocumentLibraryComponent implements OnInit {

    cols: any[];
    documents: any[];
    selectedDocument: any[];

    constructor(private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService,
                public router: Router) {
    }

    ngOnInit() {
        if (!window.localStorage.getItem(btoa('access_token'))) {
            this.wbdUtilService.logout();
            this.router.navigate(['/login']);
        }
        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'updated', header: 'Updated'},
            {field: 'size', header: 'Size'},
            {field: 'owner', header: 'Owner'}
        ];
        this.loadAllDocuments();
    }

    loadAllDocuments() {
        this.requestsService.getRequest(
            APIURLConstants.GET_ALL_DOCUMENTS_OWNER_ID + this.wbdUtilService.userInfo.id)
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'DOC_SUC_01') {
                        this.documents = response['responseData'];
                    }
                },
                (error: any) => {
                });
    }

    getIconByType(document: any): string {
        if (document.thumbnailSupported) {
            return document.thumbnailImgUrl;
        } else {
            if (document.extension === 'pdf') {
                return "assets/icons/pdf-red.png"
            } else if (document.extension === 'doc' || document.extension === 'docx') {
                return "assets/icons/word-blue.png"
            } else if (document.extension === 'xls' || document.extension === 'xlsx') {
                return "assets/icons/xls-green.png"
            } else if (document.extension === 'zip' || document.extension === '7zip' || document.extension === 'rar') {
                return "assets/icons/zip-yellow.png"
            } else {
                return "assets/icons/xls-l-blue.png"
            }
        }
    }
}
