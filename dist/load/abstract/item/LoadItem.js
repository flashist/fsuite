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
import { BaseObject } from "fcore";
import { LoadItemEvent } from "./LoadItemEvent";
import { LoadStatus } from "../LoadStatus";
var LoadItem = /** @class */ (function (_super) {
    __extends(LoadItem, _super);
    function LoadItem(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.internalPrepare();
        return _this;
    }
    LoadItem.prototype.internalPrepare = function () {
        // Override if needed
    };
    LoadItem.prototype.start = function () {
        if (this.status === LoadStatus.LOADING) {
            return;
        }
        this.status = LoadStatus.LOADING;
        this.addLoadingListeners();
        this.internalStart();
    };
    LoadItem.prototype.internalStart = function () {
        // Override if needed
    };
    LoadItem.prototype.stop = function () {
        if (this.status === LoadStatus.WAIT) {
            return;
        }
        this.status = LoadStatus.WAIT;
        this.removeLoadingListeners();
        this.internalStop();
    };
    LoadItem.prototype.internalStop = function () {
        // Override if needed
    };
    LoadItem.prototype.addLoadingListeners = function () {
        // Override if needed
    };
    LoadItem.prototype.removeLoadingListeners = function () {
        // Override if needed
    };
    LoadItem.prototype.processLoadingProgress = function (progress) {
        this.progress = progress;
        this.dispatchEvent(LoadItemEvent.PROGRESS);
    };
    LoadItem.prototype.processLoadingComplete = function (data) {
        this.data = data;
        this.status = LoadStatus.COMPLETE;
        this.removeLoadingListeners();
        this.dispatchEvent(LoadItemEvent.COMPLETE);
    };
    LoadItem.prototype.processLoadingError = function (errorData) {
        this.errorData = errorData;
        this.status = LoadStatus.ERROR;
        this.removeLoadingListeners();
        this.dispatchEvent(LoadItemEvent.ERROR);
    };
    LoadItem.prototype.getIsSuccess = function () {
        return !this.errorData;
    };
    return LoadItem;
}(BaseObject));
export { LoadItem };
//# sourceMappingURL=LoadItem.js.map