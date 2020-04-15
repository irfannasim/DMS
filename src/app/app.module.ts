import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app.routing.module';

import {AppComponent} from './components/app.component';
import {AppMenuComponent} from './components/document-library/app.menu.component';
import {AppMenuitemComponent} from './components/document-library/app.menuitem.component';
import {AppTopBarComponent} from './components/document-library/app.topbar.component';
import {AppProfileComponent} from './app.profile.component';

import {RequestsService} from "./service/requests.service";
import {LoginComponent} from "./components/login.component";
import {WbdUtilService} from "./service/wbd-util.service";
import {PrimengModule} from "./shared/primeng/primeng.module";
import {ContentComponent} from "./components/document-library/content.component";
import {MenuService} from "./service/app.menu.service";
import {SharedService} from "./service/shared.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PrimengModule

    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        // AppFooterComponent,
        AppProfileComponent,
        // AppConfigComponent,
        LoginComponent,
        ContentComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        MenuService,
        RequestsService,
        WbdUtilService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
