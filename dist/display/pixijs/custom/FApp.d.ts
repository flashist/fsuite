/// <reference types="pixi.js" />
import { App, FStage, AppProperties, Point } from "../../../index";
export declare class FApp extends App {
    private static _instance;
    stage: FStage;
    constructor(options?: AppProperties);
    getGlobalInteractionPosition(): Point;
    static readonly instance: FApp;
}
