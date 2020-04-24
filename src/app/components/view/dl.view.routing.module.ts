import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ViewDocumentComponent} from "./view.document.component";

export const viewRoutes: Routes = [
    {path: '', component: ViewDocumentComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(viewRoutes)
    ],
    declarations: []
})
export class DlViewRoutingModuleModule {
}
