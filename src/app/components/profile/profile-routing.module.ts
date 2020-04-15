import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";

export const ProfileRoutes: Routes = [
    {path: '', component: ProfileComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutes)
    ],
    declarations: []
})
export class ProfileRoutingModule {
}
