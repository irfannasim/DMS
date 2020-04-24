import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DlViewRoutingModuleModule} from "./dl.view.routing.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {ViewDocumentComponent} from "./view.document.component";

@NgModule({
    imports: [
        CommonModule,
        DlViewRoutingModuleModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    declarations: [
        ViewDocumentComponent,
    ],
})
export class DlViewModule {
}
