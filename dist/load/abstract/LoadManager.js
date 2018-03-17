import { Loader } from "./Loader";
var LoadManager = /** @class */ (function () {
    function LoadManager() {
        this.defaultLoader = new Loader();
        this.loadersToGroupMap = {};
    }
    LoadManager.prototype.addLoader = function (loader, group) {
        this.loadersToGroupMap[group] = loader;
    };
    LoadManager.prototype.getLoaderForGroup = function (group) {
        var result;
        if (group) {
            result = this.loadersToGroupMap[group];
        }
        if (!result) {
            result = this.defaultLoader;
        }
        return result;
    };
    LoadManager.prototype.add = function (item) {
        var tempLoader = this.getLoaderForGroup(item.loadGroup);
        return tempLoader.add(item);
    };
    return LoadManager;
}());
export { LoadManager };
//# sourceMappingURL=LoadManager.js.map