import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";
import {APIURLConstants} from "../../util/api.url.constants";
import {Router} from "@angular/router";
import {ConfirmationService, MenuItem, MessageService, TieredMenu} from "primeng";
import * as FileSaver from 'file-saver';
import {AppConstants} from "../../util/app.constants";
import {LoaderService} from "../../service/loader.service";

@Component({
    selector: 'trash-component',
    templateUrl: '../../templates/document-library/trash.template.html'
})
export class TrashComponent implements OnInit {

    cols: any[];
    documents: any[] = [];
    selectedDocuments: any[] = [];
    items: MenuItem[];
    toggleSelectedDocument: any;
    isTopButtonEnable: boolean = false;

    constructor(public requestsService: RequestsService,
                public wbdUtilService: WbdUtilService,
                public router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                public loaderService: LoaderService) {
    }

    ngOnInit() {
        if (!window.localStorage.getItem(btoa('access_token'))) {
            this.wbdUtilService.logout();
            this.router.navigate(['/login']);
        }
        this.cols = [
            {field: 'title', header: 'Name', width: '50%'},
            {field: 'updatedOn', header: 'Updated', width: '15%'},
            {field: 'size', header: 'Size', width: '10%'},
            {field: 'owner.fullName', header: 'Owner', width: '20%'}
        ];
        this.loadAllTrashDocuments();
        this.loadMenuItems();
    }

    loadMenuItems() {
        this.items = [
            {
                label: 'Restore', icon: 'pi pi-eye',
                command: () => {
                    this.restoreDocument();
                }
            },
            {
                label: 'Delete', icon: 'pi pi-star',
                command: () => {
                    this.confirmDeleteDocument();
                }
            },
        ];
    }

    onClickMenu(cm: TieredMenu, event: MouseEvent, data: any) {
        cm.toggle(event);
        event.stopPropagation();
        this.toggleSelectedDocument = data;
    }

    loadAllTrashDocuments() {
        this.requestsService.getRequest(
            APIURLConstants.FETCH_ALL_TRASH_DOCUMENT_API_URL + this.wbdUtilService.userInfo.id)
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'DOC_SUC_07') {
                        this.documents = response['responseData'];
                    } else {
                        this.documents = [];
                    }
                    this.loaderService.inProgress = false;
                },
                (error: any) => {
                    this.loaderService.inProgress = false;
                    this.messageService.add({
                        key: 'trashToast',
                        severity: 'error',
                        summary: 'Trash Documents',
                        detail: 'Internal Server Error, Please contact Administrator'
                    });
                });
    }

    restoreAllDocuments() {
        let ids = this.documents ? this.documents.map(d => d.id) : [];
        if (ids.length > 0) {
            this.requestsService.putRequest(
                APIURLConstants.RESTORE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_08') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loadAllTrashDocuments();
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Restore Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'trashToast',
                severity: 'warn',
                summary: 'Restore Document',
                detail: 'There is no document to restore.'
            });
        }
    }

    restoreSelectedDocuments() {
        let ids = this.selectedDocuments.map(d => d.id);
        if (ids.length > 0) {
            this.requestsService.putRequest(
                APIURLConstants.RESTORE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_08') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                            this.loadAllTrashDocuments();
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Restore Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        }
    }

    restoreDocument() {
        if (this.toggleSelectedDocument) {
            let ids: number[] = [this.toggleSelectedDocument.id];
            this.requestsService.putRequest(
                APIURLConstants.RESTORE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_08') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                            this.loadAllTrashDocuments();
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Restore Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Restore Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        }
    }

    confirmAllDocumentsDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete these documents? If deleted, will not be recoverable.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteAllDocuments();
            },
            reject: () => {
            }
        });
    }

    deleteAllDocuments() {
        let ids = this.documents ? this.documents.map(d => d.id) : [];
        if (ids.length > 0) {
            this.requestsService.postRequest(
                APIURLConstants.DELETE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_02') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loadAllTrashDocuments();
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Delete Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'trashToast',
                severity: 'warn',
                summary: 'Delete Document',
                detail: 'There is no document to delete.'
            });
        }
    }

    confirmSelectedDocumentsDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete these documents? If deleted, will not be recoverable.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteSelectedDocuments();
            },
            reject: () => {
            }
        });
    }

    deleteSelectedDocuments() {
        let ids = this.selectedDocuments ? this.selectedDocuments.map(d => d.id) : [];
        if (ids.length > 0) {
            this.requestsService.postRequest(
                APIURLConstants.DELETE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_02') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loadAllTrashDocuments();
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Delete Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'trashToast',
                severity: 'warn',
                summary: 'Delete Document',
                detail: 'There is no document to delete.'
            });
        }
    }

    confirmDeleteDocument() {
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
            let ids: number[] = [this.toggleSelectedDocument.id];
            this.requestsService.postRequest(
                APIURLConstants.DELETE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_02') {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'success',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'trashToast',
                                severity: 'error',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loadAllTrashDocuments();
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'trashToast',
                            severity: 'error',
                            summary: 'Delete Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'trashToast',
                severity: 'error',
                summary: 'Delete Document',
                detail: 'Document is not selected.'
            });
        }
    }

    onRowSelect(event: any) {
        if (this.selectedDocuments.length > 0) {
            this.isTopButtonEnable = true;
        }
    }

    onRowUnSelect(event: any) {
        if (this.selectedDocuments.length <= 0) {
            this.isTopButtonEnable = false;
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
