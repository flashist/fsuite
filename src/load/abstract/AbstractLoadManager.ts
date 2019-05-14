import {BaseObject, AssociativeArray} from "fcore";

import {ILoadItemConfig} from "./item/ILoadItemConfig";
import {Loader} from "./Loader";
import {AbstractLoadItem} from "./item/AbstractLoadItem";
import {LoadStatus} from "./LoadStatus";
import {LoaderEvent} from "./LoaderEvent";
import {LoadManagerEvent} from "./LoadManagerEvent";

export abstract class AbstractLoadManager extends BaseObject {

    static DEFAULT_LOADER_GROUP_NAME: string = "default";

    // protected defaultLoader: Loader = new Loader();
    // protected loadersToGroupMap: {[key:string]: Loader} = {};
    protected loadersToGroupMap: AssociativeArray<Loader> ;

    protected construction(...args): void {
        super.construction(...args);

        this.loadersToGroupMap = new AssociativeArray();

        this.addLoader(new Loader(), AbstractLoadManager.DEFAULT_LOADER_GROUP_NAME);
    }

    public addLoader(loader: Loader, group: string): void {
        this.loadersToGroupMap.push(loader, group);
    }

    public getLoaderForGroup(group?: string): Loader {
        let result: Loader;
        if (group) {
            result = this.loadersToGroupMap.getItem(group);
        }

        if (!result) {
            result = this.defaultLoader;
        }

        return result;
    }

    protected get defaultLoader(): Loader {
        return this.loadersToGroupMap.getItem(AbstractLoadManager.DEFAULT_LOADER_GROUP_NAME);
    }

    public getAllLoaders(): Loader[] {
        return this.loadersToGroupMap.getAllItems().concat();
    }

    public getGroupStatus(group?: string): LoadStatus {
        let tempLoader: Loader = this.getLoaderForGroup(group);
        return tempLoader.status;
    }

    public add(item: ILoadItemConfig): AbstractLoadItem {
        let tempLoader: Loader = this.getLoaderForGroup(item.loadGroup);
        this.addLoaderEvents(tempLoader, item);

        return tempLoader.add(item);
    }

    protected addLoaderEvents(loader: Loader, config: ILoadItemConfig): void {
        this.eventListenerHelper.addEventListener(
            loader,
            LoaderEvent.COMPLETE,
            () => {
                this.dispatchEvent(LoadManagerEvent.LOADER_COMPLETE, config.loadGroup);
            }
        );

        this.eventListenerHelper.addEventListener(
            loader,
            LoaderEvent.ITEM_COMPLETE,
            (item: AbstractLoadItem) => {
                this.dispatchEvent(LoadManagerEvent.LOADER_ITEM_COMPLETE, config.loadGroup, item);
            }
        );

        this.eventListenerHelper.addEventListener(
            loader,
            LoaderEvent.ERROR,
            (item: AbstractLoadItem) => {
                this.dispatchEvent(LoadManagerEvent.LOADER_ERROR, config.loadGroup);
            }
        );
    }

}