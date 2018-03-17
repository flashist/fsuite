import {AssociativeArray} from "fcore";

import {LoadItem} from "./item/LoadItem";
import {ILoadItemConfig} from "./item/ILoadItemConfig";
import {LoadTools} from "../tools/LoadTools";

export class LoaderQueue {

    public items: AssociativeArray<LoadItem> = new AssociativeArray<LoadItem>();
    public itemsToLoad: AssociativeArray<LoadItem> = new AssociativeArray<LoadItem>();
    public loadedItems: AssociativeArray<LoadItem> = new AssociativeArray<LoadItem>();

    protected isNeedSort:boolean;

    public add(item: LoadItem): void {
        this.isNeedSort = true;

        this.items.push(
            item,
            LoadTools.getUniqueLoadingId(item.config)
        );
        this.itemsToLoad.push(
            item,
            LoadTools.getUniqueLoadingId(item.config)
        );
    }

    public get(config: ILoadItemConfig): LoadItem {
        const tempId: string = LoadTools.getUniqueLoadingId(config);
        return this.items.getItem(tempId);
    }

    public getNextToLoad(): LoadItem {
        if (this.isNeedSort) {
            this.sortItems();
        }

        return this.itemsToLoad.getItemByIndex(0);
    }

    protected sortItems(): void {
        this.itemsToLoad.sort(
            (item1: LoadItem, item2: LoadItem): number => {
                let result: number = 0;

                if (item1.config.priority && item2.config.priority) {
                    if (item1.config.priority > item2.config.priority) {
                        result = -1;
                    } else if (item1.config.priority < item2.config.priority) {
                        result = 1;
                    }
                }

                return result;
            }
        );
    }

    public onItemLoad(item: LoadItem): void {
        if (this.items.indexOf(item) === -1) {
            return;
        }

        this.itemsToLoad.remove(item);
        this.loadedItems.push(item, LoadTools.getUniqueLoadingId(item.config));
    }
}