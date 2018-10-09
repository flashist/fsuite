import {BaseObject, EventListenerHelper} from "fcore";

import {LoadItemEvent} from "./LoadItemEvent";
import {ILoadItemConfig} from "./ILoadItemConfig";
import {LoadStatus} from "../LoadStatus";
import {IErrorVO} from "../data/IErrorVO";

export abstract class LoadItem extends BaseObject {

    progress: number;
    data: any;
    errorData: IErrorVO;

    status: LoadStatus;

    protected eventListenerHelper: EventListenerHelper;

    constructor(public config: ILoadItemConfig) {
        super();

        this.internalPrepare();
    }

    protected internalPrepare(): void {
        this.eventListenerHelper = new EventListenerHelper(this);
    }

    start(): void {
        if (this.status === LoadStatus.LOADING) {
            return;
        }
        this.status = LoadStatus.LOADING;

        this.addLoadingListeners();

        this.internalStart();
    }

    protected internalStart(): void {
        // Override if needed
    }

    stop(): void {
        if (this.status === LoadStatus.WAIT) {
            return;
        }
        this.status = LoadStatus.WAIT;

        this.removeLoadingListeners();

        this.internalStop();
    }

    protected internalStop(): void {
        // Override if needed
    }

    protected addLoadingListeners(): void {
        // Override if needed
    }

    protected removeLoadingListeners(): void {
        this.eventListenerHelper.removeAllListeners();
    }


    protected processLoadingProgress(progress: number): void {
        this.progress = progress;

        this.dispatchEvent(LoadItemEvent.PROGRESS);
    }

    protected processLoadingComplete(data: any): void {
        this.data = data;
        this.status = LoadStatus.COMPLETE;

        this.removeLoadingListeners();

        this.dispatchEvent(LoadItemEvent.COMPLETE, data);
    }

    protected processLoadingError(errorData: IErrorVO): void {
        this.errorData = errorData;
        this.status = LoadStatus.ERROR;

        this.removeLoadingListeners();

        this.dispatchEvent(LoadItemEvent.ERROR);
    }

    public getIsSuccess(): boolean {
        return !this.errorData;
    }

    /*public onComplete(data: any): void {
        this.success = true;

        this.data = data;

        this.dispatchEvent(LoadItemEvent.COMPLETE);
    }

    public onError(errorCode: string): void {
        this.success = false;
        this.errorCode = errorCode;

        this.dispatchEvent(LoadItemEvent.ERROR);
    }

    public onProgress(progress: number): void {
        this.progress = progress;

        this.dispatchEvent(LoadItemEvent.PROGRESS);
    }*/
}