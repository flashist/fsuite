/// <reference types="pixi.js" />
import loaders = PIXI.loaders;
import { LoadItem } from "../../abstract/item/LoadItem";
export declare class PixiImageLoadItem extends LoadItem {
    protected loader: loaders.Loader;
    protected progressBinding: any;
    protected fileCompleteBinding: any;
    protected completeBinding: any;
    protected errorBinding: any;
    protected internalPrepare(): void;
    protected internalStart(): void;
    protected internalStop(): void;
    protected addLoadingListeners(): void;
    protected removeLoadingListeners(): void;
}
