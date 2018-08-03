import {ObjectTools} from "fcore";

import {DisplayObjectContainer} from "../DisplayObjectContainer";
import {IResizeConfig} from "./IResizeConfig";
import {DefaultResizeConfig} from "./DefaultResizeConfig";

export class DisplayResizeTools {

    private static DEFAULT_RESIZE_CONFIG: IResizeConfig = new DefaultResizeConfig();

    public static scaleObject(
        object: DisplayObjectContainer,
        width: number,
        height: number,
        config?: IResizeConfig): void {

        if (config) {
            ObjectTools.copyProps(config, DisplayResizeTools.DEFAULT_RESIZE_CONFIG, true);
        } else {
            config = DisplayResizeTools.DEFAULT_RESIZE_CONFIG;
        }

        if (object.width <= 0 || object.height <= 0) {
            return;
        }

        if (!config.upscaleAllowed && object.width <= width && object.height <= height) {
            return;
        }

        const maxDelta: number = width / height;
        const objDelta: number = object.width / object.height;

        if ((objDelta > maxDelta && config.scaleByMaxSide) || (objDelta <= maxDelta && !config.scaleByMaxSide)) {
            object.width = width;
            object.scale.y = object.scale.x;

        } else {
            object.height = height;
            object.scale.x = object.scale.y;
        }
    }
}