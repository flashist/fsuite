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
import { EventListenerHelper, Logger } from "fcore";
import { DisplayObjectContainer, FDisplayEvent, DisplayEvent, FDisplayTools } from "../../../../index";
var FContainer = /** @class */ (function (_super) {
    __extends(FContainer, _super);
    function FContainer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.isFContainer = true;
        _this.isNeedToDestructOnRemoveFromStage = false;
        _this.eventListenerHelper = new EventListenerHelper(_this);
        _this.stageListenerHelper = new EventListenerHelper(_this);
        _this.construction.apply(_this, args);
        _this.isConstructed = true;
        _this.onConstructedComplete();
        _this.commitData();
        // PIXI eveents
        _this.stageListenerHelper.addEventListener(_this, DisplayEvent.ADDED, function () {
            _this.stage = FDisplayTools.findStageInDisplayList(_this);
        });
        _this.stageListenerHelper.addEventListener(_this, DisplayEvent.REMOVED, function (container) {
            _this.stage = null;
        });
        // Custom events
        _this.stageListenerHelper.addEventListener(_this, FDisplayEvent.ADDED_TO_STAGE, _this.onAddedToStage);
        return _this;
    }
    FContainer.prototype.construction = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Note: subclasses should implement their own logic here
    };
    FContainer.prototype.destruction = function () {
        // Note: subclasses should implement their own logic here
        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }
        if (this.stageListenerHelper) {
            this.stageListenerHelper.destruction();
            this.stageListenerHelper = null;
        }
        this.removeListeners();
    };
    FContainer.prototype.addListeners = function () {
        this.removeListeners();
        // Note: subclasses should implement their own logic here
    };
    FContainer.prototype.removeListeners = function () {
        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    };
    FContainer.prototype.onConstructedComplete = function () {
        // TODO: might be used in subclasses to initiate object behavior,
        // when all children are created and prepared
    };
    FContainer.prototype.onAddedToStage = function () {
        this.addListeners();
        this.commitData();
    };
    FContainer.prototype.onRemovedFromStage = function () {
        this.removeListeners();
        if (this.isNeedToDestructOnRemoveFromStage) {
            this.destruction();
        }
    };
    FContainer.prototype.commitData = function () {
        // Note: subclasses should implement their own logic here
        this.arrange();
    };
    FContainer.prototype.arrange = function () {
        // Note: subclasses should implement their own logic here
    };
    Object.defineProperty(FContainer.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this.data == value) {
                return;
            }
            this._data = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FContainer.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        set: function (value) {
            if (value === this._stage) {
                return;
            }
            if (this._stage && value) {
                Logger.error("FContainer | set stage __ The stage param can't be set to different value, before being empty!");
                return;
            }
            this._stage = value;
            this.updateChildrenStage();
            if (this.stage) {
                this.emit(FDisplayEvent.ADDED_TO_STAGE);
            }
            else {
                this.emit(FDisplayEvent.REMOVED_FROM_STAGE);
            }
        },
        enumerable: true,
        configurable: true
    });
    FContainer.prototype.updateChildrenStage = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (FContainer.isFContainer(child)) {
                child.stage = this.stage;
            }
        }
    };
    //
    FContainer.isFContainer = function (object) {
        return object.isFContainer;
    };
    return FContainer;
}(DisplayObjectContainer));
export { FContainer };
//# sourceMappingURL=FContainer.js.map