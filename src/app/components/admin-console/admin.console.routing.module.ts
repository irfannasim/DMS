import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminConsoleComponent} from "./admin.console.component";
import {UserContentComponent} from "./user.content.component";
import {UserComponent} from "./user.component";
import {AccountSettingComponent} from "./account.setting.component";

export const AdminConsoleRoutes: Routes = [
    {path: '', component: AdminConsoleComponent},
    {path: 'user', component: UserComponent},
    {path: 'user-content', component: UserContentComponent},
    {path: 'account-setting', component: AccountSettingComponent},

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminConsoleRoutes)
    ],
    declarations: []
})
export class AdminConsoleRoutingModule {
}
