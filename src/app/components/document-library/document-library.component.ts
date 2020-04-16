import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {APIURLConstants} from "../../util/api.url.constants";
import {WbdUtilService} from "../../service/wbd-util.service";

@Component({
    selector: 'document-library-component',
    templateUrl: '../../templates/document-library/document.library.template.html'
})
export class DocumentLibraryComponent implements OnInit {

    constructor(private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService) {
    }

    ngOnInit() {
    }

}
