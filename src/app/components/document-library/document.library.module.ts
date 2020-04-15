import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DocumentLibraryRoutingModuleModule} from "./document.library.routing.module";
import {PrimengModule} from "../../shared/primeng/primeng.module";
import {DocumentLibraryComponent} from "./document-library.component";

@NgModule({
    imports: [
        CommonModule,
        DocumentLibraryRoutingModuleModule,
        PrimengModule,
        ReactiveFormsModule
    ],
    declarations: [
        DocumentLibraryComponent
    ],
})
export class DocumentLibraryModule {
}
