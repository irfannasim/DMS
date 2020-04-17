import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {RequestsService} from '../../service/requests.service';

@Component({
    selector: 'user-component',
    templateUrl: '../../templates/admin-console/user.template.html'
})
export class UserComponent {

    constructor(private router: Router,
                private requestsService: RequestsService,
                private messageService: MessageService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {

    }

}
