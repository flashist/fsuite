import {
    DisplayObject,
    DisplayObjectContainer,
    FStage
} from "../../../../../index";

export class FDisplayTools {

    static findStageInDisplayList(object: DisplayObject): FStage {
        let result: FStage;

        let tempParent: DisplayObjectContainer = object.parent;
        while (tempParent) {
            if (FStage.isFStage(tempParent)) {
                result = (tempParent as FStage);
                break;
            } else {
                tempParent = tempParent.parent;
            }
        }

        return result;
    }

}