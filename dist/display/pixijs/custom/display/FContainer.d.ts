/// <reference types="pixi.js" />
import { EventListenerHelper } from "fcore";
import { DisplayObjectContainer, FStage } from "../../../../index";
export declare class FContainer<DataType extends object = object> extends DisplayObjectContainer {
    isFContainer: boolean;
    protected isConstructed: boolean;
    isNeedToDestructOnRemoveFromStage: boolean;
    private _data;
    private _stage;
    protected eventListenerHelper: EventListenerHelper<Event | string | any>;
    protected stageListenerHelper: EventListenerHelper<Event | string | any>;
    constructor(...args: any[]);
    protected construction(...args: any[]): void;
    destruction(): void;
    protected addListeners(): void;
    protected removeListeners(): void;
    protected onConstructedComplete(): void;
    protected onAddedToStage(): void;
    protected onRemovedFromStage(): void;
    protected commitData(): void;
    protected arrange(): void;
    data: DataType;
    stage: FStage;
    protected updateChildrenStage(): void;
    static isFContainer(object: any): boolean;
}
