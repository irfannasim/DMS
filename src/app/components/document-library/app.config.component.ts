/*
import {Component, OnInit} from '@angular/core';
import {ContentComponent} from "./content.component";

@Component({
    selector: 'content-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': content.configActive}"
             (click)="content.onConfigClick($event)">
            <div class="layout-config-content">
                <a style="cursor: pointer" id="layout-config-button" class="layout-config-button"
                   (click)="onConfigButtonClick($event)">
                    <i class="fa fa-fw fa-cog"></i>
                </a>
                <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                    <i class="fa fa-times"></i>
                </a>
                <p-tabView>
                    <p-tabPanel header="Menu">
                        <h1>Menu Modes</h1>
                        <div class="panel-items">
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="content.changeToStaticMenu()">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Static.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="content.isStatic()"></i>
                                </a>
                                <span>Static</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="content.changeToOverlayMenu()">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Overlay.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="content.isOverlay()"></i>
                                </a>
                                <span>Overlay</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="content.changeToHorizontalMenu()">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Horizontal.png"
                                         alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="content.isHorizontal()"></i>
                                </a>
                                <span>Horizontal</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="content.changeToSlimMenu()">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Slim.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="content.isSlim()"></i>
                                </a>
                                <span>Slim</span>
                            </div>
                        </div>
                        <h1>Menu Colors</h1>
                        <div class="panel-items">
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="this.content.darkMenu = true">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Dark.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="content.darkMenu"></i>
                                </a>
                                <span>Dark</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="this.content.darkMenu = false">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Static.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="!content.darkMenu"></i>
                                </a>
                                <span>Light</span>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="User Profile">
                        <div class="panel-items">
                            <div class="panel-item">
                                <a style="cursor: pointer" [class]="content.isHorizontal() ? 'ui-state-disabled':''"
                                   (click)="onProfileModeClick('inline')">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Inline.png" alt="avalon"/>
                                    <i class="fa fa-check"
                                       *ngIf="content.profileMode === 'inline' && !content.isHorizontal()"></i>
                                </a>
                                <span>Inline</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" [class]="content.isHorizontal() ? 'ui-state-disabled':''"
                                   (click)="onProfileModeClick('top')">
                                    <img src="assets/layout/images/configurator/menu/Avalon-Popup.png" alt="avalon"/>
                                    <i class="fa fa-check"
                                       *ngIf="content.profileMode === 'top' || content.isHorizontal()"></i>
                                </a>
                                <span>Overlay</span>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Bootstrap">
                        <div class="panel-items">
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="changeVersion('v3')">
                                    <img src="assets/layout/images/configurator/v3/avalon-bootstrap3.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="version === 'v3'"></i>
                                </a>
                                <span>V3</span>
                            </div>
                            <div class="panel-item">
                                <a style="cursor: pointer" (click)="changeVersion('v4')">
                                    <img src="assets/layout/images/configurator/v4/avalon-bootstrap4.png" alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="version === 'v4'"></i>
                                </a>
                                <span>V4</span>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Layout">
                        <h1>Flat</h1>
                        <div class="panel-items">
                            <div class="panel-item colors" *ngFor="let flatLayoutColor of flatLayoutColors">
                                <a style="cursor: pointer" class="layout-config-layout-option"
                                   (click)="changeLayout(flatLayoutColor.label)">
                                    <img
                                        src="assets/layout/images/configurator/{{version}}/layouts/flat/{{flatLayoutColor.label}}.png"
                                        alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="layout === flatLayoutColor.label"></i>
                                </a>
                            </div>
                        </div>
                        <h1>Special</h1>
                        <div class="panel-items">
                            <div class="panel-item colors" *ngFor="let specialLayoutColor of specialLayoutColors">
                                <a style="cursor: pointer" class="layout-config-layout-option"
                                   (click)="changeLayout(specialLayoutColor.label, true)">
                                    <img
                                        src="assets/layout/images/configurator/{{version}}/layouts/special/{{specialLayoutColor.label}}.png"
                                        alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="layout === specialLayoutColor.label"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Themes">
                        <div class="panel-items">
                            <div class="panel-item" *ngFor="let theme of themes">
                                <a style="cursor: pointer" class="layout-config-option"
                                   (click)="changeTheme(theme.label)">
                                    <img src="assets/layout/images/configurator/{{version}}/themes/{{theme.image}}"
                                         alt="avalon"/>
                                    <i class="fa fa-check" *ngIf="themeColor === theme.label"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                </p-tabView>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    themes: any[];
    flatLayoutColors: any[];
    specialLayoutColors: any[];
    version = 'v4';
    themeColor = 'blue';
    layout = 'blue';

    constructor(public content: ContentComponent) {
    }

    ngOnInit() {
        this.flatLayoutColors = [
            {label: 'blue'},
            {label: 'purple'},
            {label: 'cyan'},
            {label: 'indigo'},
            {label: 'teal'},
            {label: 'pink'},
            {label: 'lime'},
            {label: 'green'},
            {label: 'amber'},
            {label: 'brown'},
            {label: 'orange'},
            {label: 'deeppurple'},
            {label: 'lightblue'},
            {label: 'lightgreen'},
            {label: 'darkgrey'},
        ];
        this.specialLayoutColors = [
            {label: 'influenza'},
            {label: 'suzy'},
            {label: 'calm'},
            {label: 'crimson'},
            {label: 'night'},
            {label: 'skyline'},
            {label: 'sunkist'},
            {label: 'littleleaf'},
            {label: 'joomla'},
            {label: 'firewatch'}
        ];
        this.themes = [
            {label: 'blue', image: 'blue.svg'},
            {label: 'cyan', image: 'cyan.svg'},
            {label: 'indigo', image: 'indigo.svg'},
            {label: 'purple', image: 'purple.svg'},
            {label: 'teal', image: 'teal.svg'},
            {label: 'orange', image: 'orange.svg'},
            {label: 'deeppurple', image: 'deeppurple.svg'},
            {label: 'lightblue', image: 'lightblue.svg'},
            {label: 'green', image: 'green.png'},
            {label: 'lightgreen', image: 'lightgreen.png'},
            {label: 'lime', image: 'lime.svg'},
            {label: 'amber', image: 'amber.png'},
            {label: 'brown', image: 'brown.png'},
            {label: 'darkgrey', image: 'darkgrey.svg'},
            {label: 'pink', image: 'pink.svg'},
        ];
    }

    changeLayout(layout: string, special?: boolean) {
        if (this.version === 'v3') {
            this.changeStyleSheetsColor('layout-css', 'layout-' + layout + '.css');
        } else {
            this.changeStyleSheetsColor('layout-css', 'layout-' + layout + '-v4' + '.css');
        }

        this.layout = layout;
    }

    changeTheme(theme: string) {
        if (this.version === 'v3') {
            this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
        } else {
            this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '-v4' + '.css');
        }

        this.themeColor = theme;
    }

    changeVersion(version: string) {
        if (version === 'v3' && this.version !== version) {
            this.version = 'v3';
            this.changeStyleSheetsColor('theme-css', 'theme-' + this.themeColor + '.css');
            this.changeStyleSheetsColor('layout-css', 'layout-' + this.layout + '.css');
        } else if (version === 'v4' && this.version !== version) {
            this.changeStyleSheetsColor('theme-css', 'theme-' + this.themeColor + '-v4' + '.css');
            this.changeStyleSheetsColor('layout-css', 'layout-' + this.layout + '-v4' + '.css');
            this.version = 'v4';
        }
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onProfileModeClick(mode: string) {
        if (this.content.isHorizontal()) {
            return;
        }

        this.content.profileMode = mode;
    }

    onConfigButtonClick(event) {
        this.content.configActive = !this.content.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.content.configActive = false;
        event.preventDefault();
    }
}
*/
