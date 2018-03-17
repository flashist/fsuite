/// <reference types="preloadjs" />
import { LoadItem } from "../../abstract/item/LoadItem";
import { IPreloadJSLoadCompleteEvent } from "./IPreloadJSLoadEvent";
export declare class FileLoadItem extends LoadItem {
    protected queue: createjs.LoadQueue;
    protected internalPrepare(): void;
    protected internalStart(): void;
    protected internalStop(): void;
    protected addLoadingListeners(): void;
    protected removeLoadingListeners(): void;
    protected onFileLoad(event: IPreloadJSLoadCompleteEvent): void;
    protected onProgress(event: createjs.ProgressEvent): void;
    protected onError(event: createjs.ErrorEvent): void;
}
