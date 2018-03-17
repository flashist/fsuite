import { BaseObject, EventListenerHelper } from "fcore";
import { LoadItem } from "./item/LoadItem";
import { ILoadItemConfig } from "./item/ILoadItemConfig";
import { LoaderQueue } from "./LoaderQueue";
import { LoadStatus } from "./LoadStatus";
export declare class Loader extends BaseObject {
    protected queue: LoaderQueue;
    status: LoadStatus;
    stopOnError: boolean;
    protected curItem: LoadItem;
    protected curItemEventListenerHelper: EventListenerHelper<string>;
    construction(...args: any[]): void;
    start(): void;
    stop(): void;
    add(config: ILoadItemConfig): LoadItem;
    protected loadNext(): void;
    protected load(item: LoadItem): void;
    protected addCurItemListeners(): void;
    protected removeCurItemListeners(): void;
    protected onItemProgress(): void;
    protected onItemComplete(): void;
    protected onItemError(): void;
    getCurrentLoadingItem(): LoadItem;
}
