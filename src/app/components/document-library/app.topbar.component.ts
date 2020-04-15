import {Component} from '@angular/core';
import {ContentComponent} from "./content.component";

@Component({
    selector: 'app-topbar',
    templateUrl: '../../templates/document-library/app.topbar.template.html'
})
export class AppTopBarComponent {

    constructor(public content: ContentComponent) {
    }

}
