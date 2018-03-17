import {
    App,
    FStage,
    AppProperties
} from "../../../index";

export class FApp extends App {

    public stage: FStage;

    constructor(options?: AppProperties) {
        super(options);

        // FStage
        this.stage.isFStage = true;
    }

}