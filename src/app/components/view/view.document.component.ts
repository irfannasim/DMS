import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng";

@Component({
    selector: 'view-document-component',
    templateUrl: '../../templates/view/view.document.template.html'
})
export class ViewDocumentComponent implements OnInit {

    constructor(private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService,
                public router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit() {
    }
}
