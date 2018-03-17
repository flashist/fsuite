import { AssociativeArray } from "fcore";
import { LoadItem } from "./item/LoadItem";
import { ILoadItemConfig } from "./item/ILoadItemConfig";
export declare class LoaderQueue {
    items: AssociativeArray<LoadItem>;
    itemsToLoad: AssociativeArray<LoadItem>;
    loadedItems: AssociativeArray<LoadItem>;
    protected isNeedSort: boolean;
    add(item: LoadItem): void;
    get(config: ILoadItemConfig): LoadItem;
    getNextToLoad(): LoadItem;
    protected sortItems(): void;
    onItemLoad(item: LoadItem): void;
}
