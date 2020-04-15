import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminConsoleComponent} from "./admin.console.component";

export const AdminConsoleRoutes: Routes = [
    {path: '', component: AdminConsoleComponent},
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
