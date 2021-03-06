/// <reference types="pixi.js" />
import { App, FStage, AppProperties, Point } from "../../../index";
export declare class FApp extends App {
    stage: FStage;
    constructor(options?: AppProperties);
    getGlobalInteractionPosition(): Point;
}
