import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminConsoleRoutingModule} from "./admin.console.routing.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {AdminConsoleComponent} from "./admin.console.component";

@NgModule({
    imports: [
        CommonModule,
        AdminConsoleRoutingModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminConsoleComponent
    ],
})
export class AdminConsoleModule {
}
