import {Command} from "fcore";
import {
    AbstractLoadItem,
    getInstance,
    Loader,
    LoaderEvent,
    LoadManager,
    ILoadItemConfig
} from "../../..";

export class LoadItemCommand extends Command {

    constructor(protected loadConfig: ILoadItemConfig) {
        super();
    }

    protected executeInternal(): void {
        super.executeInternal();

        let loadManager: LoadManager = getInstance(LoadManager);

        let tempLoader: Loader = loadManager.getLoaderForGroup(this.loadConfig.loadGroup);
        tempLoader.add(this.loadConfig);
        this.eventListenerHelper.addEventListener(
            tempLoader,
            LoaderEvent.ITEM_COMPLETE,
            (item: AbstractLoadItem) => {
                if (item.config.src == this.loadConfig.src) {
                    this.notifyComplete(item.data);
                }
            }
        );
        this.eventListenerHelper.addEventListener(
            tempLoader,
            LoaderEvent.ERROR,
            () => {
                console.error("LoadCommand | executeInternal __ PRELOAD LOADING ERROR!");
                let tempItem: AbstractLoadItem = tempLoader.getCurrentLoadingItem();
                if (tempItem.config.src === this.loadConfig.src) {
                    this.errorCode = tempItem.errorData.errorCode;
                    this.notifyComplete(null, tempItem.errorData);
                }
            }
        );

        tempLoader.start();
    }

}