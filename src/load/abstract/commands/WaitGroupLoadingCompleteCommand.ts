import {Command} from "fcore";
import {
    AbstractLoadItem,
    getInstance,
    Loader,
    LoaderEvent,
    LoadManager,
    LoadStatus
} from "../../..";

export class WaitGroupLoadingCompleteCommand extends Command {

    constructor(protected group: string) {
        super();
    }

    protected executeInternal(): void {
        super.executeInternal();

        let loadManager: LoadManager = getInstance(LoadManager);

        let tempLoader: Loader = loadManager.getLoaderForGroup(this.group);
        if (tempLoader.status === LoadStatus.COMPLETE) {
            this.notifyComplete();

        } else {
            this.eventListenerHelper.addEventListener(
                tempLoader,
                LoaderEvent.COMPLETE,
                () => {
                    this.notifyComplete();
                }
            );
        }
    }

}