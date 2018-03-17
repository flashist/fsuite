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
import { LoadManager as AbstractLoadManager } from "../abstract/LoadManager";
import { LoadFactory as AbstractLoadFactory } from "../abstract/LoadFactory";
import { PreloadjsPixiLoadFactory } from "./PreloadjsPixiLoadFactory";
var PreloadjsPixiLoadManager = /** @class */ (function (_super) {
    __extends(PreloadjsPixiLoadManager, _super);
    function PreloadjsPixiLoadManager() {
        var _this = _super.call(this) || this;
        AbstractLoadFactory.instance = new PreloadjsPixiLoadFactory();
        return _this;
    }
    return PreloadjsPixiLoadManager;
}(AbstractLoadManager));
export { PreloadjsPixiLoadManager };
//# sourceMappingURL=PreloadjsPixiLoadManager.js.map