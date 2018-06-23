import {
    App,
    FStage,
    AppProperties,
    Point
} from "../../../index";

import {RendererPlugins} from "pixi.js";

export class FApp extends App {

    private static _instance: FApp;

    public stage: FStage;

    constructor(options?: AppProperties) {
        super(options);

        FApp._instance = this;

        // FStage
        this.stage.isFStage = true;
    }

    public getGlobalInteractionPosition(): Point {
        return (this.renderer.plugins as RendererPlugins).interaction.mouse.global;
    }


    public static get instance(): FApp {
        return FApp._instance;
    }
}