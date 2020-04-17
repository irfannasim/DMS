import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminConsoleRoutingModule} from "./admin.console.routing.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {AdminConsoleComponent} from "./admin.console.component";
import {UserComponent} from "./user.component";
import {UserContentComponent} from "./user.content.component";
import {AccountSettingComponent} from "./account.setting.component";

@NgModule({
    imports: [
        CommonModule,
        AdminConsoleRoutingModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminConsoleComponent,
        UserComponent,
        UserContentComponent,
        AccountSettingComponent
    ],
})
export class AdminConsoleModule {
}
