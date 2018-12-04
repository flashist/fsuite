import {EventListenerHelper, Logger} from "fcore";

import {
    DisplayObjectContainer,
    FStage,
    FDisplayEvent,
    DisplayEvent,
    FDisplayTools,
    serviceLocatorProcessItemOnActivate,
    serviceLocatorProcessItemOnDeactivate
} from "../../../../index";

export class FContainer<DataType extends object = object> extends DisplayObjectContainer {

    public isFContainer: boolean = true;

    protected isConstructed: boolean;
    public isNeedToDestructOnRemoveFromStage: boolean = false;

    private _data: DataType;
    private _stage: FStage;

    protected eventListenerHelper: EventListenerHelper<Event | string | any>;
    protected stageListenerHelper: EventListenerHelper<Event | string | any>;

    constructor(...args) {
        super();

        this.eventListenerHelper = new EventListenerHelper(this);
        this.stageListenerHelper = new EventListenerHelper(this);

        this.construction(...args);
        this.isConstructed = true;
        this.onConstructedComplete();

        this.commitData();

        // PIXI eveents
        this.stageListenerHelper.addEventListener(
            this,
            DisplayEvent.ADDED,
            () => {
                this.stage = FDisplayTools.findStageInDisplayList(this);
            }
        );
        this.stageListenerHelper.addEventListener(
            this,
            DisplayEvent.REMOVED,
            (container: DisplayObjectContainer) => {
                this.stage = null;
            }
        );
        // Custom events
        this.stageListenerHelper.addEventListener(
            this,
            FDisplayEvent.ADDED_TO_STAGE,
            this.onAddedToStage
        );
        this.stageListenerHelper.addEventListener(
            this,
            FDisplayEvent.REMOVED_FROM_STAGE,
            this.onRemovedFromStage
        );
    }


    protected construction(...args): void {
        // Note: subclasses should implement their own logic here
    }

    public destruction(): void {
        // Note: subclasses should implement their own logic here

        this.destroy();

        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }

        if (this.stageListenerHelper) {
            this.stageListenerHelper.destruction();
            this.stageListenerHelper = null;
        }

        this.removeListeners();
    }


    protected addListeners(): void {
        this.removeListeners();

        // Note: subclasses should implement their own logic here
    }

    protected removeListeners(): void {
        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    }

    protected onConstructedComplete(): void {
        // TODO: might be used in subclasses to initiate object behavior,
        // when all children are created and prepared
    }

    protected onAddedToStage(): void {
        serviceLocatorProcessItemOnActivate(this);

        this.addListeners();
        this.commitData();
    }

    protected onRemovedFromStage(): void {
        serviceLocatorProcessItemOnDeactivate(this);

        this.removeListeners();

        if (this.isNeedToDestructOnRemoveFromStage) {
            this.destruction();
        }
    }

    protected commitData(): void {
        // Note: subclasses should implement their own logic here

        this.arrange();
    }

    protected arrange(): void {
        // Note: subclasses should implement their own logic here
    }


    public get data(): DataType {
        return this._data;
    }
    public set data(value: DataType) {
        if (this.data == value) {
            return;
        }

        this._data = value;

        this.commitData();
    }

    public get stage(): FStage {
        return this._stage;
    }
    public set stage(value: FStage) {

        if (value === this._stage) {
            return;
        }

        if (this._stage && value) {
            Logger.error("FContainer | set stage __ The stage param can't be set to different value, before being empty!");
            return;
        }

        this._stage = value;
        this.updateChildrenStage();

        if (this.stage) {
            this.emit(FDisplayEvent.ADDED_TO_STAGE);
        } else {
            this.emit(FDisplayEvent.REMOVED_FROM_STAGE);
        }
    }

    protected updateChildrenStage(): void {
        for (const child of this.children) {
            if (FContainer.isFContainer(child)) {
                (child as FContainer).stage = this.stage;
            }
        }
    }

    //
    static isFContainer(object: any): boolean {
        return (object as FContainer).isFContainer;
    }
}