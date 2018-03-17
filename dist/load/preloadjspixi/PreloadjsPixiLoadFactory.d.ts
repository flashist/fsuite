import { LoadFactory as AbstractLoadFactory } from "../abstract/LoadFactory";
import { LoadItem } from "../abstract/item/LoadItem";
import { ILoadItemConfig } from "../abstract/item/ILoadItemConfig";
export declare class PreloadjsPixiLoadFactory extends AbstractLoadFactory {
    createItem(config: ILoadItemConfig): LoadItem;
}
