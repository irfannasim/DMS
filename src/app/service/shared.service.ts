import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

    shouldViewPayRun: boolean = false;
    timeoutSubscribed: boolean = false;
    isUserLoggedIn: boolean = false;
    userLoggedIn: Subject<boolean> = new Subject();
    reconcileObj: any;
}
