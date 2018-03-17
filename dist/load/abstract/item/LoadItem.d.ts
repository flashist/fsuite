import { BaseObject } from "fcore";
import { ILoadItemConfig } from "./ILoadItemConfig";
import { LoadStatus } from "../LoadStatus";
import { IErrorVO } from "../data/IErrorVO";
export declare abstract class LoadItem extends BaseObject {
    config: ILoadItemConfig;
    progress: number;
    data: any;
    errorData: IErrorVO;
    status: LoadStatus;
    constructor(config: ILoadItemConfig);
    protected internalPrepare(): void;
    start(): void;
    protected internalStart(): void;
    stop(): void;
    protected internalStop(): void;
    protected addLoadingListeners(): void;
    protected removeLoadingListeners(): void;
    protected processLoadingProgress(progress: number): void;
    protected processLoadingComplete(data: any): void;
    protected processLoadingError(errorData: IErrorVO): void;
    getIsSuccess(): boolean;
}
