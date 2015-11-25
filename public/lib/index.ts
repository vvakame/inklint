import "reflect-metadata";
import "zone.js";

import {Component, bootstrap} from 'angular2/angular2';
import IkaLogService from "./ikalog";

@Component({
    selector: 'inklint',
    template: '<h1>My First Angular 2 App</h1>',
    providers: [IkaLogService]
})
class AppComponent {
    constructor(public ikaLogService: IkaLogService) {
        this.ikaLogService.emitter.onAny((e: any) => {
            console.log("app", e);
        });
    }
}

bootstrap(AppComponent);
