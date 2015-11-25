import open, * as hub from "ikaloghub/lib";
import {Injectable} from 'angular2/angular2';

@Injectable()
export default class IkaLogService {
    emitter: hub.IkaEventEmitter;
    constructor() {
        this.emitter = open();
        this.emitter.onAny(handler);
        this.emitter.on("error", handler);

        function handler(e: hub.InkEvent) {
            console.log(e);
        }
    }
}
