import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";

@Component({
    selector: 'document-library-component',
    templateUrl: '../../templates/document-library/document.library.template.html'
})
export class DocumentLibraryComponent implements OnInit {

    constructor(private requestsService: RequestsService) {
    }

    ngOnInit() {
    }

}
