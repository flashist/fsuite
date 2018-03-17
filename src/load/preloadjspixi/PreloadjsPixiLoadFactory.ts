import {
    LoadFactory as AbstractLoadFactory
} from "../abstract/LoadFactory";
import {LoadItem} from "../abstract/item/LoadItem";
import {ILoadItemConfig} from "../abstract/item/ILoadItemConfig";
import {FileLoadItem} from "./item/FileLoadItem";
import {FileType} from "../abstract/data/FileType";
import {PixiImageLoadItem} from "./item/PixiImageLoadItem";

export class PreloadjsPixiLoadFactory extends AbstractLoadFactory {

    createItem(config: ILoadItemConfig): LoadItem {
        // Only FileLoadItem, until other loaders are implemented

        let result: LoadItem;

        if (this.basePath) {
            config.basePath = this.basePath;
        }

        switch (config.fileType) {
            case FileType.IMAGE:
            case FileType.SPRITESHEET:
                result = new PixiImageLoadItem(config);
                break;
            default:
                result = new FileLoadItem(config);
        }

        return result;
    }

}