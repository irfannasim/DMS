import { browser, by, element } from 'protractor';

export class AvalonPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(by.css('content-root h1')).getText() as Promise<string>;
    }
}
