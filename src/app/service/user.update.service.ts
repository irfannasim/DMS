import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UserUpdateService {

    public newSubject = new Subject<any>();

    uploadProfileImage(profileImgUrl: string) {
        this.newSubject.next(profileImgUrl);
    }

    updateUserProfile(data: any) {
        this.newSubject.next(data);
    }

}
