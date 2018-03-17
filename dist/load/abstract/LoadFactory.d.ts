import { ILoadItemConfig } from "./item/ILoadItemConfig";
import { LoadItem } from "./item/LoadItem";
export declare abstract class LoadFactory {
    static instance: LoadFactory;
    basePath: string;
    abstract createItem(config: ILoadItemConfig): LoadItem;
}
