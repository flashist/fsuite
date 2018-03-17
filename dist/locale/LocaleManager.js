import { StringTools } from "fcore";
import { getInstance } from "../servicelocator/ServiceLocator";
var LocaleManager = /** @class */ (function () {
    function LocaleManager() {
        this.localeToIdMap = {};
        this.setCurrentLanguage("");
    }
    LocaleManager.prototype.addLocale = function (data) {
        // Support adding texts to the old localization
        if (this.localeToIdMap[data.language]) {
            var oldLocale = this.localeToIdMap[data.language];
            // ObjectTools.copyProps(oldLocale.texts, data.texts);
            Object.assign(oldLocale.texts, data.texts);
        }
        else {
            this.localeToIdMap[data.language] = data;
        }
        this.commitLocaleData();
    };
    LocaleManager.prototype.getCurrentLanguage = function () {
        return this._currentLanguage;
    };
    LocaleManager.prototype.setCurrentLanguage = function (value) {
        if (value == this._currentLanguage) {
            return;
        }
        this._currentLanguage = value;
        this.commitLocaleData();
    };
    LocaleManager.prototype.commitLocaleData = function () {
        this.currentLocale = this.localeToIdMap[this._currentLanguage];
    };
    LocaleManager.prototype.getText = function (textId, params) {
        if (params === void 0) { params = null; }
        var result = "";
        if (this.currentLocale) {
            if (this.currentLocale.texts[textId]) {
                result = this.currentLocale.texts[textId];
                result = this.format(result, params);
            }
        }
        return result;
    };
    LocaleManager.prototype.format = function (str, params) {
        if (params === void 0) { params = null; }
        var res = str;
        // Change links by key L on the specific locales
        res = res.replace(/(\d+)L/gi, this.replaceRegExpKeyByStrings);
        //
        if (str && params) {
            res = StringTools.substitute(res, params);
        }
        // Check the links with L again
        res = res.replace(/(\d+)L/gi, this.replaceRegExpKeyByStrings);
        return res;
    };
    LocaleManager.prototype.replaceRegExpKeyByStrings = function (substring) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.currentLocale.texts[substring];
    };
    return LocaleManager;
}());
export { LocaleManager };
export function getText(textId, params) {
    if (params === void 0) { params = null; }
    return getInstance(LocaleManager).getText(textId, params);
}
;
//# sourceMappingURL=LocaleManager.js.map