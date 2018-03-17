import loaders = PIXI.loaders;

import {LoadItem} from "../../abstract/item/LoadItem";

export class PixiImageLoadItem extends LoadItem {

    protected loader: loaders.Loader;

    protected progressBinding: any;
    protected fileCompleteBinding: any;
    protected completeBinding: any;
    protected errorBinding: any;

    protected internalPrepare(): void {
        this.loader = new loaders.Loader(this.config.basePath);
        // this.loader.baseUrl = this.config.basePath + this.config.src;
        this.loader.add(
            this.config.id || this.config.src,
            this.config.src
        );

        /*this.queue = new createjs.LoadQueue(
            false,
            this.config.basePath
        );
        this.queue.loadFile(
            this.config.src,
            false
        );*/
    }

    protected internalStart():void {
        super.internalStart();

        this.loader.load();
    }

    protected internalStop():void {
        super.internalStop();

        if (this.loader) {
            this.loader.reset();
        }
    }

    protected addLoadingListeners(): void {
        super.addLoadingListeners();

        this.progressBinding = this.loader.onProgress.add(
            (loader: loaders.Loader, resource: loaders.Resource) => {
                this.processLoadingProgress(loader.progress / 100);
            }
        );
        /*this.fileCompleteBinding = this.loader.onLoad.add(
            (loader: loaders.Loader, resource: loaders.Resource) => {
                console.log(args);
            }
        );*/
        this.completeBinding = this.loader.onComplete.add(
            (loader: loaders.Loader, resourcesMap: {[key: string]: loaders.Resource}) => {
                this.processLoadingComplete(resourcesMap);
            }
        );
        this.errorBinding = this.loader.onError.add(
            (error: any, loader: loaders.Loader, resource: loaders.Resource) => {
                this.processLoadingError(
                    {
                        data: error,
                        errorCode: error.toString
                    }
                );
            }
        );
    }

    protected removeLoadingListeners(): void {
        super.removeLoadingListeners();

        if (!this.loader) {
            return;
        }

        this.loader.onProgress.detach(this.progressBinding);
        // this.loader.onLoad.detach(this.fileCompleteBinding);
        this.loader.onComplete.detach(this.completeBinding);
        this.loader.onError.detach(this.errorBinding);
    }
}