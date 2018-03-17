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
import { BaseObject, EventListenerHelper } from "fcore";
import { LoaderQueue } from "./LoaderQueue";
import { LoadStatus } from "./LoadStatus";
import { LoadItemEvent } from "./item/LoadItemEvent";
import { LoadFactory } from "./LoadFactory";
import { LoaderEvent } from "./LoaderEvent";
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queue = new LoaderQueue();
        _this.stopOnError = false;
        return _this;
    }
    Loader.prototype.construction = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.construction.apply(this, args);
        this.curItemEventListenerHelper = new EventListenerHelper(this);
    };
    Loader.prototype.start = function () {
        if (this.status === LoadStatus.LOADING) {
            return;
        }
        this.status = LoadStatus.LOADING;
        if (this.curItem) {
            this.load(this.curItem);
        }
        else {
            this.loadNext();
        }
    };
    Loader.prototype.stop = function () {
        if (this.status === LoadStatus.WAIT) {
            return;
        }
        this.status = LoadStatus.WAIT;
        if (this.curItem) {
            this.curItem.stop();
        }
    };
    Loader.prototype.add = function (config) {
        var result = this.queue.get(config);
        if (!result) {
            result = LoadFactory.instance.createItem(config);
            this.queue.add(result);
        }
        return result;
    };
    Loader.prototype.loadNext = function () {
        var tempItem = this.queue.getNextToLoad();
        if (tempItem) {
            this.load(tempItem);
        }
        else {
            this.status = LoadStatus.COMPLETE;
            this.curItem = null;
            this.dispatchEvent(LoaderEvent.COMPLETE);
        }
    };
    Loader.prototype.load = function (item) {
        this.curItem = item;
        this.addCurItemListeners();
        this.curItem.start();
    };
    Loader.prototype.addCurItemListeners = function () {
        this.removeCurItemListeners();
        if (!this.curItem) {
            return;
        }
        this.curItemEventListenerHelper.addEventListener(this.curItem, LoadItemEvent.PROGRESS, this.onItemProgress);
        this.curItemEventListenerHelper.addEventListener(this.curItem, LoadItemEvent.COMPLETE, this.onItemComplete);
        this.curItemEventListenerHelper.addEventListener(this.curItem, LoadItemEvent.ERROR, this.onItemError);
    };
    Loader.prototype.removeCurItemListeners = function () {
        if (!this.curItem) {
            return;
        }
        this.curItemEventListenerHelper.removeAllListeners(this.curItem);
    };
    Loader.prototype.onItemProgress = function () {
        this.dispatchEvent(LoaderEvent.PROGRESS);
    };
    Loader.prototype.onItemComplete = function () {
        this.dispatchEvent(LoaderEvent.ITEM_COMPLETE);
        this.queue.onItemLoad(this.curItem);
        this.loadNext();
    };
    Loader.prototype.onItemError = function () {
        this.dispatchEvent(LoaderEvent.ERROR);
        this.queue.onItemLoad(this.curItem);
        if (this.stopOnError) {
            this.status = LoadStatus.ERROR;
            this.stop();
        }
        else {
            this.loadNext();
        }
    };
    Loader.prototype.getCurrentLoadingItem = function () {
        return this.queue.getNextToLoad();
    };
    return Loader;
}(BaseObject));
export { Loader };
//# sourceMappingURL=Loader.js.map