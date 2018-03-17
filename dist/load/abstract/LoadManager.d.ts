import { ILoadItemConfig } from "./item/ILoadItemConfig";
import { Loader } from "./Loader";
import { LoadItem } from "./item/LoadItem";
export declare class LoadManager {
    protected defaultLoader: Loader;
    protected loadersToGroupMap: {
        [key: string]: Loader;
    };
    addLoader(loader: Loader, group: string): void;
    getLoaderForGroup(group?: string): Loader;
    add(item: ILoadItemConfig): LoadItem;
}
