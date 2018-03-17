import { FStage } from "../../../../../index";
var FDisplayTools = /** @class */ (function () {
    function FDisplayTools() {
    }
    FDisplayTools.findStageInDisplayList = function (object) {
        var result;
        var tempParent = object.parent;
        while (tempParent) {
            if (FStage.isFStage(tempParent)) {
                result = tempParent;
                break;
            }
            else {
                tempParent = tempParent.parent;
            }
        }
        return result;
    };
    return FDisplayTools;
}());
export { FDisplayTools };
//# sourceMappingURL=FDisplayTools.js.map