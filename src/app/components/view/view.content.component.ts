import {Component, OnInit, Renderer2} from '@angular/core';
import {MenuService} from "../../service/app.menu.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WbdUtilService} from "../../service/wbd-util.service";
import {SharedService} from "../../service/shared.service";
import {APIURLConstants} from "../../util/api.url.constants";
import {RequestsService} from "../../service/requests.service";

@Component({
    selector: 'view-content-component',
    templateUrl: '../../templates/view/view.content.template.html',
})
export class ViewContentComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {

    }

}
