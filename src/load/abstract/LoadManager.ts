import {ILoadItemConfig} from "./item/ILoadItemConfig";
import {Loader} from "./Loader";
import {LoadItem} from "./item/LoadItem";
import {LoadStatus} from "./LoadStatus";
export class LoadManager {

    protected defaultLoader: Loader = new Loader();
    protected loadersToGroupMap: {[key:string]: Loader} = {};

    public addLoader(loader: Loader, group: string): void {
        this.loadersToGroupMap[group] = loader;
    }

    public getDefaultLoader(): Loader {
        return this.defaultLoader;
    }

    public getLoaderForGroup(group?: string): Loader {
        let result: Loader;
        if (group) {
            result = this.loadersToGroupMap[group];
        }
        if (!result) {
            result = this.defaultLoader;
        }

        return result;
    }

    public getGroupStatus(group?: string): LoadStatus {
        let tempLoader: Loader = this.getLoaderForGroup(group);
        return tempLoader.status;
    }

    public add(item: ILoadItemConfig): LoadItem {
        let tempLoader: Loader = this.getLoaderForGroup(item.loadGroup);
        return tempLoader.add(item);
    }

}