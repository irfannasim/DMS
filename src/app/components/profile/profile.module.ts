import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {ProfileComponent} from "./profile.component";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileComponent
    ],
})
export class ProfileModule {
}
