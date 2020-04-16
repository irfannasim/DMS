import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SharedService {

    isUserLoggedIn: boolean = false;
    userLoggedIn: Subject<boolean> = new Subject();
}
