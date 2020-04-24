import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";
import {APIURLConstants} from "../../util/api.url.constants";
import {Router} from "@angular/router";
import {ConfirmationService, MenuItem, MessageService, TieredMenu} from "primeng";

@Component({
    selector: 'document-library-component',
    templateUrl: '../../templates/document-library/document.library.template.html'
})
export class DocumentLibraryComponent implements OnInit {

    cols: any[];
    documents: any[];
    selectedDocument: any[];
    items: MenuItem[];
    toggleSelectedDocument: any;

    constructor(private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService,
                public router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        if (!window.localStorage.getItem(btoa('access_token'))) {
            this.wbdUtilService.logout();
            this.router.navigate(['/login']);
        }
        this.cols = [
            {field: 'name', header: 'Name', width: '50%'},
            {field: 'updated', header: 'Updated', width: '15%'},
            {field: 'size', header: 'Size', width: '10%'},
            {field: 'owner', header: 'Owner', width: '20%'}
        ];
        this.loadAllDocuments();
        this.items = [
            {
                label: 'Preview', icon: 'pi pi-eye',
            },
            {
                label: 'Share', icon: 'pi pi-share-alt'
            },
            {
                label: 'Download', icon: 'pi pi-download'
            },
            {
                label: 'Rename', icon: 'pi pi-pencil'
            },
            {
                label: 'Move To', icon: 'pi pi-fw pi-times'
            },
            {
                label: 'Make a Copy', icon: 'pi pi-copy'
            },
            {
                label: 'Add to Favourites', icon: 'pi pi-star-o'
            },
            {
                label: 'View Details', icon: 'pi pi-fw pi-times'
            },
            {
                label: 'More Actions', icon: 'pi pi-fw pi-times',
                items: [
                    {
                        label: 'Trash', icon: 'pi pi-trash',
                        command: () => {
                            this.confirmDelete();
                        }
                    },
                    {label: 'Set Expiration', icon: 'pi pi-fw pi-download'},
                    {label: 'Upload New Version', icon: 'pi pi-upload'},
                    {label: 'Print Barcode', icon: 'pi pi-print'}
                ]
            },
        ];
    }

    onClickMenu(cm: TieredMenu, event: MouseEvent, data: any) {
        cm.toggle(event);
        event.stopPropagation();
        this.toggleSelectedDocument = data;
    }

    loadAllDocuments() {
        this.requestsService.getRequest(
            APIURLConstants.GET_ALL_DOCUMENTS_OWNER_ID_API_URL + this.wbdUtilService.userInfo.id)
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'DOC_SUC_01') {
                        this.documents = response['responseData'];
                    }
                },
                (error: any) => {
                });
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this document?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteDocument();
            },
            reject: () => {
            }
        });
    }

    deleteDocument() {
        if (this.toggleSelectedDocument) {
            this.requestsService.deleteRequest(
                APIURLConstants.DELETE_DOCUMENT_API_URL + this.toggleSelectedDocument.id)
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_02') {
                            this.messageService.add({
                                key: 'documentLibraryToast',
                                severity: 'success',
                                summary: 'Customer',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'documentLibraryToast',
                                severity: 'error',
                                summary: 'Customer',
                                detail: response['responseMessage']
                            });
                        }
                    },
                    (error: any) => {
                    });
        } else {
            this.messageService.add({
                key: 'documentLibraryToast',
                severity: 'error',
                summary: 'Customer',
                detail: 'Document is not selected.'
            });
        }
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
