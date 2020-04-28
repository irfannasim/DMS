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
    selector: 'favourite-component',
    templateUrl: '../../templates/document-library/favourite.template.html'
})
export class FavouriteComponent implements OnInit {

    cols: any[];
    documents: any[];
    selectedDocuments: any[];
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
        this.loadAllFavouriteDocuments();
        this.loadMenuItems();
    }

    loadMenuItems() {
        this.items = [
            {
                label: 'Preview', icon: 'pi pi-eye',
            },
            {
                label: 'Download', icon: 'pi pi-download',
                command: () => {
                    this.downloadDocument();
                }
            },
            {
                label: 'Rename', icon: 'pi pi-pencil'
            },
            {
                label: 'Move To', icon: 'pi pi-fw pi-times'
            },
            {
                label: 'Remove Favourite', icon: 'pi pi-star',
                command: () => {
                    this.unFavouriteDocument();
                }
            },
            {
                label: 'Trash', icon: 'pi pi-trash',
                command: () => {
                    this.confirmDocumentArchive();
                }
            },
        ];
    }

    onClickMenu(cm: TieredMenu, event: MouseEvent, data: any) {
        cm.toggle(event);
        event.stopPropagation();
        this.toggleSelectedDocument = data;
    }

    loadAllFavouriteDocuments() {
        this.requestsService.getRequest(
            APIURLConstants.FETCH_ALL_FAVOURITE_DOCUMENT_API_URL + this.wbdUtilService.userInfo.id)
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'DOC_SUC_05') {
                        this.documents = response['responseData'];
                    }
                    this.loaderService.inProgress = false;
                },
                (error: any) => {
                    this.loaderService.inProgress = false;
                    this.messageService.add({
                        key: 'favouriteToast',
                        severity: 'error',
                        summary: 'Document Library',
                        detail: 'Internal Server Error, Please contact Administrator'
                    });
                });
    }

    confirmSelectedDocumentsArchive() {
        this.confirmationService.confirm({
            message: 'Do you want to delete these documents?, these documents will move to trash.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.archiveSelectedDocuments();
            },
            reject: () => {
            }
        });
    }

    archiveSelectedDocuments() {
        let ids = this.selectedDocuments.map(d => d.id);
        if (ids.length > 0) {
            this.requestsService.putRequest(
                APIURLConstants.ARCHIVE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_06') {
                            let delIds: number[] = response['responseData'];
                            for (let id of delIds) {
                                let index = this.documents.findIndex(d => d.id === id);
                                this.documents.splice(index, 1);
                            }
                            this.messageService.add({
                                key: 'favouriteToast',
                                severity: 'success',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'favouriteToast',
                                severity: 'error',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'error',
                            summary: 'Delete Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'favouriteToast',
                severity: 'error',
                summary: 'Delete Document',
                detail: 'Document is not selected.'
            });
        }
    }

    confirmDocumentArchive() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this document?, this document will move to trash.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.archiveDocument();
            },
            reject: () => {
            }
        });
    }

    archiveDocument() {
        if (this.toggleSelectedDocument) {
            let ids: number[] = [this.toggleSelectedDocument.id];
            this.requestsService.putRequest(
                APIURLConstants.ARCHIVE_DOCUMENT_API_URL,
                {"docIds": ids})
                .subscribe(
                    (response: Response) => {
                        if (response['responseCode'] === 'DOC_SUC_06') {
                            let delIds: number[] = response['responseData'];
                            for (let id of delIds) {
                                let index = this.documents.findIndex(d => d.id === id);
                                this.documents.splice(index, 1);
                            }
                            this.messageService.add({
                                key: 'favouriteToast',
                                severity: 'success',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        } else {
                            this.messageService.add({
                                key: 'favouriteToast',
                                severity: 'error',
                                summary: 'Delete Document',
                                detail: response['responseMessage']
                            });
                        }
                        this.loaderService.inProgress = false;
                    },
                    (error: any) => {
                        this.loaderService.inProgress = false;
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'error',
                            summary: 'Delete Document',
                            detail: 'Internal Server Error, Please contact Administrator'
                        });
                    });
        } else {
            this.messageService.add({
                key: 'favouriteToast',
                severity: 'error',
                summary: 'Delete Document',
                detail: 'Document not selected.'
            });
        }
    }

    downloadDocument() {
        this.requestsService.getRequestFile(APIURLConstants.DOWNLOAD_DOCUMENT_API_URL + this.toggleSelectedDocument.id)
            .subscribe(
                (response: any) => {
                    let fileName = this.toggleSelectedDocument.title + "." + this.toggleSelectedDocument.extension;
                    let mimeType = this.getMimeTypeByFileName(fileName);
                    let blob = new Blob([response], {type: mimeType});
                    FileSaver.saveAs(blob, fileName);
                    this.messageService.add({
                        key: 'favouriteToast',
                        severity: 'success',
                        summary: 'Download Document',
                        detail: 'Document downloaded successfully.'
                    });
                    this.loaderService.inProgress = false;
                }, (error: any) => {
                    this.messageService.add({
                        key: 'favouriteToast',
                        severity: 'error',
                        summary: 'Download Document',
                        detail: 'Unable to download document.'
                    });
                    this.loaderService.inProgress = false;
                });
    }

    unFavouriteDocument() {
        this.requestsService.putRequest(APIURLConstants.FAVOURITE_DOCUMENT_API_URL,
            {"docId": this.toggleSelectedDocument.id})
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'DOC_SUC_04') {
                        const index = this.documents.map(d => d.id).indexOf(this.toggleSelectedDocument.id);
                        this.documents.splice(index, 1);
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'success',
                            summary: 'Favourite Document',
                            detail: response['responseMessage']
                        });
                    } else {
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'error',
                            summary: 'Favourite Document',
                            detail: response['responseMessage']
                        });
                    }
                    this.loaderService.inProgress = false;
                },
                (error: any) => {
                    this.loaderService.inProgress = false;
                    this.messageService.add({
                        key: 'favouriteToast',
                        severity: 'error',
                        summary: 'Favourite Document',
                        detail: 'Internal Server Error, Please contact Administrator'
                    });
                });
    }

    downloadSelectedDocuments() {
        for (let item of this.selectedDocuments) {
            this.requestsService.getRequestFile(APIURLConstants.DOWNLOAD_DOCUMENT_API_URL + item.id)
                .subscribe(
                    (response: any) => {
                        let fileName = item.title + "." + item.extension;
                        let mimeType = this.getMimeTypeByFileName(fileName);
                        let blob = new Blob([response], {type: mimeType});
                        FileSaver.saveAs(blob, fileName);
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'success',
                            summary: 'Download Document',
                            detail: fileName + ' downloaded successfully.'
                        });
                        this.loaderService.inProgress = false;
                    }, (error: any) => {
                        this.messageService.add({
                            key: 'favouriteToast',
                            severity: 'error',
                            summary: 'Download Document',
                            detail: 'Unable to download document.'
                        });
                        this.loaderService.inProgress = false;
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

    getMimeTypeByFileName(fileName: string) {
        let ext = fileName.substring(fileName.indexOf(".") + 1);

        if (AppConstants.EXT_BMP === ext) {
            return AppConstants.MIME_BMP;
        } else if (AppConstants.EXT_DOC === ext) {
            return AppConstants.MIME_DOC;
        } else if (AppConstants.EXT_DOCX === ext) {
            return AppConstants.MIME_DOCX;
        } else if (AppConstants.EXT_FLV === ext) {
            return AppConstants.MIME_FLV;
        } else if (AppConstants.EXT_GIF === ext) {
            return AppConstants.MIME_GIF;
        } else if (AppConstants.EXT_JPEG === ext) {
            return AppConstants.MIME_JPEG;
        } else if (AppConstants.EXT_JPG === ext) {
            return AppConstants.MIME_JPG;
        } else if (AppConstants.EXT_PNG === ext) {
            return AppConstants.MIME_PNG;
        } else if (AppConstants.EXT_PPT === ext) {
            return AppConstants.MIME_PPT;
        } else if (AppConstants.EXT_PPTX === ext) {
            return AppConstants.MIME_PPTX;
        } else if (AppConstants.EXT_XLS === ext) {
            return AppConstants.MIME_XLS;
        } else if (AppConstants.EXT_XLSX === ext) {
            return AppConstants.MIME_XLSX;
        } else if (AppConstants.EXT_HTML === ext) {
            return AppConstants.MIME_HTML;
        } else if (AppConstants.EXT_TXT === ext) {
            return AppConstants.MIME_TXT;
        } else if (AppConstants.EXT_XHTML === ext) {
            return AppConstants.MIME_XHTML;
        } else if (AppConstants.EXT_PDF === ext) {
            return AppConstants.MIME_PDF;
        } else if (AppConstants.EXT_SQL === ext) {
            return AppConstants.MIME_SQL;
        } else if (AppConstants.EXT_RAR === ext) {
            return AppConstants.MIME_RAR;
        } else if (AppConstants.EXT_ZIP === ext) {
            return AppConstants.MIME_ZIP;
        } else if (AppConstants.EXT_7ZIP === ext) {
            return AppConstants.MIME_7ZIP;
        } else {
            return AppConstants.MIME_UNKNOWN;
        }
    }
}
