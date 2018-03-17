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
import { App } from "../../../index";
var FApp = /** @class */ (function (_super) {
    __extends(FApp, _super);
    function FApp(options) {
        var _this = _super.call(this, options) || this;
        // FStage
        _this.stage.isFStage = true;
        return _this;
    }
    return FApp;
}(App));
export { FApp };
//# sourceMappingURL=FApp.js.map