import { Dictionary } from "fcore";
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
    }
    ServiceLocator.activate = function () {
        var tempInjection;
        var keys = ServiceLocator.injectionsMap.getKeys();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var prop = keys_1[_i];
            tempInjection = ServiceLocator.injectionsMap.getItem(prop);
            if (tempInjection.config) {
                if (tempInjection.config.forceCreation) {
                    ServiceLocator.getInstance(tempInjection.item);
                }
            }
        }
    };
    ServiceLocator.add = function (item, toSubstitute, config) {
        var tempInjection = ServiceLocator.getInjection(item);
        if (toSubstitute) {
            tempInjection.toSubstitute = toSubstitute;
            var toSubstituteInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);
            toSubstituteInjection.substitution = item;
        }
        if (config) {
            tempInjection.config = config;
        }
        else {
            if (toSubstitute) {
                var toSubstituteInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);
                // If there is no config for the item, but there is a config for the item which should be substituted,
                // then use the item-to-be-substituted config.
                if (toSubstituteInjection.config) {
                    tempInjection.config = toSubstituteInjection.config;
                }
            }
        }
    };
    ServiceLocator.getInstance = function (item) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result;
        var tempInjection = ServiceLocator.getInjection(item);
        if (tempInjection.config && tempInjection.config.isSingletone) {
            if (!tempInjection.singletoneInstance) {
                tempInjection.singletoneInstance = new tempInjection.item(args);
            }
            result = tempInjection.singletoneInstance;
        }
        else {
            result = new tempInjection.item(args);
        }
        return result;
    };
    ServiceLocator.getInjection = function (item) {
        // Create if not created yet
        if (!ServiceLocator.injectionsMap.getItem(item)) {
            ServiceLocator.injectionsMap.addItem(item, {
                item: item
            });
        }
        var result = ServiceLocator.injectionsMap.getItem(item);
        if (result.substitution) {
            result = ServiceLocator.getInjection(result.substitution);
        }
        return result;
    };
    ServiceLocator.injectionsMap = new Dictionary();
    return ServiceLocator;
}());
export { ServiceLocator };
// Shortcuts
export var getInstance = ServiceLocator.getInstance;
//# sourceMappingURL=ServiceLocator.js.map