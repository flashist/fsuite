import {LoadManager as AbstractLoadManager} from "../abstract/LoadManager";
import {LoadFactory as AbstractLoadFactory} from "../abstract/LoadFactory";
import {PreloadjsPixiLoadFactory} from "./PreloadjsPixiLoadFactory";

export class PreloadjsPixiLoadManager extends AbstractLoadManager {
    constructor() {
        super();

        AbstractLoadFactory.instance = new PreloadjsPixiLoadFactory();
    }
}