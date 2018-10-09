import {BaseObject, EventListenerHelper} from "fcore";

import {LoadItem} from "./item/LoadItem";
import {ILoadItemConfig} from "./item/ILoadItemConfig";
import {LoaderQueue} from "./LoaderQueue";
import {LoadStatus} from "./LoadStatus";
import {LoadItemEvent} from "./item/LoadItemEvent";
import {LoadFactory} from "./LoadFactory";
import {LoaderEvent} from "./LoaderEvent";

export class Loader extends BaseObject {

    protected queue:LoaderQueue = new LoaderQueue();

    public status: LoadStatus = LoadStatus.WAIT;

    public stopOnError: boolean = false;

    protected curItem: LoadItem;
    protected curItemEventListenerHelper: EventListenerHelper<string>;

    public autoStartOnAdd: boolean = true;

    construction(...args): void {
        super.construction(...args);

        this.curItemEventListenerHelper = new EventListenerHelper<string>(this);
    }

    public start(): void {
        if (this.status === LoadStatus.LOADING) {
            return;
        }
        this.status = LoadStatus.LOADING;

        if (this.curItem) {
            this.load(this.curItem)
        } else {
            this.loadNext();
        }
    }

    public stop(): void {
        if (this.status === LoadStatus.WAIT) {
            return;
        }
        this.status = LoadStatus.WAIT;

        if (this.curItem) {
            this.curItem.stop();
        }
    }

    add(config: ILoadItemConfig): LoadItem {
        let result: LoadItem = this.queue.get(config);

        if (!result) {
            result = LoadFactory.instance.createItem(config);
            this.queue.add(result);
        }

        if (this.status === LoadStatus.WAIT) {
            this.start();
        }

        return result;
    }

    protected loadNext(): void {
        let tempItem: LoadItem = this.queue.getNextToLoad();
        if (tempItem) {
            this.load(tempItem);

        } else {
            this.status = LoadStatus.COMPLETE;
            this.curItem = null;

            this.dispatchEvent(LoaderEvent.COMPLETE);
        }
    }

    protected load(item: LoadItem): void {
        this.curItem = item;
        this.addCurItemListeners();

        this.curItem.start();
    }

    protected addCurItemListeners():void {
        this.removeCurItemListeners();

        if (!this.curItem) {
            return;
        }

        this.curItemEventListenerHelper.addEventListener(
            this.curItem,
            LoadItemEvent.PROGRESS,
            this.onItemProgress
        );

        this.curItemEventListenerHelper.addEventListener(
            this.curItem,
            LoadItemEvent.COMPLETE,
            this.onItemComplete
        );

        this.curItemEventListenerHelper.addEventListener(
            this.curItem,
            LoadItemEvent.ERROR,
            this.onItemError
        );
    }

    protected removeCurItemListeners():void {
        if (!this.curItem) {
            return;
        }

        this.curItemEventListenerHelper.removeAllListeners(this.curItem);
    }

    protected onItemProgress(): void {
        this.dispatchEvent(LoaderEvent.PROGRESS);
    }

    protected onItemComplete(): void {
        this.dispatchEvent(LoaderEvent.ITEM_COMPLETE, this.curItem);

        this.queue.onItemLoad(this.curItem);

        this.loadNext();
    }

    protected onItemError(): void {
        this.dispatchEvent(LoaderEvent.ERROR);

        this.queue.onItemLoad(this.curItem);

        if (this.stopOnError) {
            this.status = LoadStatus.ERROR;
            this.stop();

        } else {
            this.loadNext();
        }
    }

    public getCurrentLoadingItem(): LoadItem {
        return this.queue.getNextToLoad();
    }
}