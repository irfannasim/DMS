import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from "./components/login.component";
import {ContentComponent} from "./components/document-library/content.component";
import {ViewContentComponent} from "./components/view/view.content.component";

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'document-library', component: ContentComponent,
        children: [
            {path: '', loadChildren: './components/document-library/document.library.module#DocumentLibraryModule'},
        ]
    },
    {
        path: 'admin-console', component: ContentComponent,
        children: [
            {path: '', loadChildren: './components/admin-console/admin.console.module#AdminConsoleModule'},
        ]
    },
    {
        path: 'profile', component: ContentComponent,
        children: [
            {path: '', loadChildren: './components/profile/profile.module#ProfileModule'},
        ]
    },
    {
        path: 'dl/view', component: ViewContentComponent,
        children: [
            {path: '', loadChildren: './components/view/dl.view.module#DlViewModule'},
        ]
    },
];

export const AppRoutingModule: ModuleWithProviders =
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
