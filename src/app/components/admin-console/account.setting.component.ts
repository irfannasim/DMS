import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {RequestsService} from '../../service/requests.service';

@Component({
    selector: 'admin-console-component',
    templateUrl: '../../templates/admin-console/account.setting.template.html'
})
export class AccountSettingComponent {

    constructor(private router: Router,
                private requestsService: RequestsService,
                private messageService: MessageService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {

    }

}
