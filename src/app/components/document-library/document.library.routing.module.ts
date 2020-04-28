import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DocumentLibraryComponent} from "./document-library.component";
import {FavouriteComponent} from "./favourite.component";
import {TrashComponent} from "./trash.component";

export const DocumentLibraryRoutes: Routes = [
    {path: '', component: DocumentLibraryComponent},
    {path: 'favourites', component: FavouriteComponent},
    {path: 'trash', component: TrashComponent},
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
