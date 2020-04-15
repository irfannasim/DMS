import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DocumentLibraryComponent} from "./document-library.component";

export const DocumentLibraryRoutes: Routes = [
    {path: '', component: DocumentLibraryComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DocumentLibraryRoutes)
    ],
    declarations: []
})
export class DocumentLibraryRoutingModuleModule {
}
