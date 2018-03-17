var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { LoadFactory as AbstractLoadFactory } from "../abstract/LoadFactory";
import { FileLoadItem } from "./item/FileLoadItem";
import { FileType } from "../abstract/data/FileType";
import { PixiImageLoadItem } from "./item/PixiImageLoadItem";
var PreloadjsPixiLoadFactory = /** @class */ (function (_super) {
    __extends(PreloadjsPixiLoadFactory, _super);
    function PreloadjsPixiLoadFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadjsPixiLoadFactory.prototype.createItem = function (config) {
        // Only FileLoadItem, until other loaders are implemented
        var result;
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
    };
    return PreloadjsPixiLoadFactory;
}(AbstractLoadFactory));
export { PreloadjsPixiLoadFactory };
//# sourceMappingURL=PreloadjsPixiLoadFactory.js.map