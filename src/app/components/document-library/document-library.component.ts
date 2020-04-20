import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../service/requests.service";
import {WbdUtilService} from "../../service/wbd-util.service";

@Component({
    selector: 'document-library-component',
    templateUrl: '../../templates/document-library/document.library.template.html'
})
export class DocumentLibraryComponent implements OnInit {

    cars: any[];
    cols: any[];
    selectedCars1: any[];

    constructor(private requestsService: RequestsService,
                public wbdUtilService: WbdUtilService) {
    }

    ngOnInit() {
        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'updated', header: 'Updated'},
            {field: 'size', header: 'Size'},
            {field: 'owner', header: 'Owner'}
        ];
        this.loadCars();
    }

    getIconByType(fileName: string): string {
        let type = fileName.substr(fileName.lastIndexOf('.') + 1);
        if (type === 'pdf') {
            return "assets/icons/pdf-red.png"
        } else if (type === 'doc') {
            return "assets/icons/word-blue.png"
        } else if (type === 'xls') {
            return "assets/icons/xls-green.png"
        } else if (type === 'zip') {
            return "assets/icons/zip-yellow.png"
        } else {
            return "assets/icons/xls-l-blue.png"
        }
    }

    loadCars() {
        this.cars = [
            {
                "id": 1,
                "name": "Sample Pdf Document.pdf",
                "updated": '11 Mins Ago',
                "size": "10 KB",
                "owner": "Irfan Nasim",
                "icon": "assets/icons/pdf-red.png"
            },
            {
                "id": 2,
                "name": "Sample Word Document.doc",
                "updated": '25 Mins Ago',
                "size": "20 MB",
                "owner": "Muhammad Imran",
                "icon": "assets/icons/word-blue.png"
            },
            {
                "id": 3,
                "name": "Sample Excel Document.xls",
                "updated": 'Today',
                "size": "253.5 MB",
                "owner": "Abdul Ghaffar",
                "icon": "assets/icons/xls-green.png"
            },
            {
                "id": 4,
                "name": "Sample File.fil",
                "updated": '10-March-2020',
                "size": "10.54 KB",
                "owner": "Muhammad Suleman",
                "icon": "assets/icons/xls-l-blue.png"
            },
            {
                "id": 5,
                "name": "Sample Zip File.zip",
                "updated": '25-March-2020',
                "size": "1.5 GB",
                "owner": "Shahid Iqbal",
                "icon": "assets/icons/zip-yellow.png"
            },
            {
                "id": 6,
                "name": "Sample Pdf Document.pdf",
                "updated": '11 Mins Ago',
                "size": "10 KB",
                "owner": "Irfan Nasim",
                "icon": "assets/icons/pdf-red.png"
            },
            {
                "id": 7,
                "name": "Sample Word Document.doc",
                "updated": '25 Mins Ago',
                "size": "20 MB",
                "owner": "Muhammad Imran",
                "icon": "assets/icons/word-blue.png"
            },
            {
                "id": 8,
                "name": "Sample Excel Document.xls",
                "updated": 'Today',
                "size": "253.5 MB",
                "owner": "Abdul Ghaffar",
                "icon": "assets/icons/xls-green.png"
            },
            {
                "id": 9,
                "name": "Sample File.fil",
                "updated": '10-March-2020',
                "size": "10.54 KB",
                "owner": "Muhammad Suleman",
                "icon": "assets/icons/xls-l-blue.png"
            },
            {
                "id": 10,
                "name": "Sample Zip File.zip",
                "updated": '25-March-2020',
                "size": "1.5 GB",
                "owner": "Shahid Iqbal",
                "icon": "assets/icons/zip-yellow.png"
            },
        ]
    }

}
