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
import { AssociativeArray, BaseObject } from "fcore";
import { ChangeActionType } from "./ChangeActionType";
var GenericObjectsModel = /** @class */ (function (_super) {
    __extends(GenericObjectsModel, _super);
    function GenericObjectsModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = new AssociativeArray();
        return _this;
    }
    GenericObjectsModel.prototype.parseSource = function (source) {
        switch (source.action) {
            case ChangeActionType.REMOVE:
                this.removeItem(source.id);
                break;
            //case ChangeActionType.UPDATE:
            default:
                this.updateItem(this.getItem(source.id), source);
                break;
        }
    };
    GenericObjectsModel.prototype.getItem = function (id, isNeedToCreate) {
        if (isNeedToCreate === void 0) { isNeedToCreate = true; }
        var result = this.items.getItem(id);
        if (!result) {
            if (isNeedToCreate) {
                result = this.createEmpty(id);
                this.items.push(result, result.id);
            }
        }
        return result;
    };
    GenericObjectsModel.prototype.removeItem = function (id) {
        this.items.removeByKey(id);
    };
    Object.defineProperty(GenericObjectsModel.prototype, "itemsCount", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    GenericObjectsModel.prototype.createEmpty = function (id) {
        return { id: id, type: "" };
    };
    GenericObjectsModel.prototype.updateItem = function (item, source) {
        if (item.update) {
            item.update(source);
        }
        else {
            Object.assign(item, source);
        }
    };
    GenericObjectsModel.prototype.getItems = function () {
        return this.items.getAllItems();
    };
    return GenericObjectsModel;
}(BaseObject));
export { GenericObjectsModel };
//# sourceMappingURL=GenericObjectsModel.js.map