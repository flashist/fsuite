import {
    App,
    FStage,
    AppProperties,
    Point
} from "../../../index";

import {RendererPlugins} from "pixi.js";

export class FApp extends App {

    public stage: FStage;

    constructor(options?: AppProperties) {
        super(options);

        // FStage
        this.stage.isFStage = true;
    }

    public getGlobalInteractionPosition(): Point {
        return (this.renderer.plugins as RendererPlugins).interaction.mouse.global;
    }
}