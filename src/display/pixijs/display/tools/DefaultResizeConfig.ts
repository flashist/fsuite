import {IResizeConfig} from "./IResizeConfig";

export class DefaultResizeConfig implements IResizeConfig {
    upscaleAllowed: boolean = false;
    scaleByMaxSide: boolean = true;
}