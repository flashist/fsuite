import {LoadItem} from "../../abstract/item/LoadItem";
import {PreloadjsLoadQueueEventType} from "./PreloadjsLoadQueueEventType";
import {IPreloadJSLoadCompleteEvent} from "./IPreloadJSLoadEvent";

export class FileLoadItem extends LoadItem {

    protected queue: createjs.LoadQueue;

    protected internalPrepare(): void {
        this.queue = new createjs.LoadQueue(
            false,
            this.config.basePath
        );
        this.queue.loadFile(
            this.config.src,
            false
        );
    }

    protected internalStart():void {
        super.internalStart();

        this.queue.load();
    }

    protected internalStop():void {
        super.internalStop();

        if (this.queue) {
            this.queue.setPaused(true);
        }
    }

    protected addLoadingListeners(): void {
        super.addLoadingListeners();

        this.queue.on(
            PreloadjsLoadQueueEventType.FILE_LOAD,
            this.onFileLoad,
            this
        );
        this.queue.on(
            PreloadjsLoadQueueEventType.PROGRESS,
            this.onProgress,
            this
        );
        this.queue.on(
            PreloadjsLoadQueueEventType.ERROR,
            this.onError,
            this
        );
    }

    protected removeLoadingListeners(): void {
        super.removeLoadingListeners();

        this.queue.removeEventListener(PreloadjsLoadQueueEventType.FILE_LOAD, this.onFileLoad);
        this.queue.removeEventListener(PreloadjsLoadQueueEventType.PROGRESS, this.onProgress);
        this.queue.removeEventListener(PreloadjsLoadQueueEventType.ERROR, this.onError);
    }

    protected onFileLoad(event: IPreloadJSLoadCompleteEvent): void {
        this.processLoadingComplete(event.result);
    }

    protected onProgress(event: createjs.ProgressEvent): void {
        this.processLoadingProgress(event.progress);
    }

    protected onError(event: createjs.ErrorEvent): void {
        this.processLoadingError(
            {
                data: event.data,
                errorCode: event.title
            }
        );
    }
}