import {Command} from "fcore";
import {getInstance, Loader, LoaderEvent, LoadManager} from "../../..";
import {LoadItem} from "../../..";
import {LoadCommandErrorCodes} from "./LoadCommandErrorCode";

export class LoadCommand extends Command {

    constructor(protected url: string) {
        super();
    }

    protected executeInternal(): void {
        super.executeInternal();

        // Start loading
        let loadManager: LoadManager = getInstance(LoadManager);
        let tempPreloadLoader: Loader = loadManager.getDefaultLoader();
        this.eventListenerHelper.addEventListener(
            tempPreloadLoader,
            LoaderEvent.ITEM_COMPLETE,
            (item: LoadItem) => {
                if (item.config.src == this.url) {
                    this.notifyComplete();
                }
            }
        );
        this.eventListenerHelper.addEventListener(
            tempPreloadLoader,
            LoaderEvent.ERROR,
            () => {
                console.error("LoadCommand | executeInternal __ PRELOAD LOADING ERROR!");
                this.errorCode = LoadCommandErrorCodes.LOADING_ERROR;
                this.notifyComplete();
            }
        );

        tempPreloadLoader.start();
    }

}