import {Lock, AssociativeArray, BaseObject} from "fcore";

import {TweenLite} from "gsap";

import {Sound} from "../../index";

export abstract class AbstractSoundsManager extends BaseObject {

    protected soundsToIdMap: AssociativeArray<Sound> = new AssociativeArray<Sound>();

    protected disableLock: Lock = new Lock();

    private _tweenVolumeValue: number;

    public defaultTweenTime: number = 0.5;

    protected construction(...args): void {
        super.construction(...args);

        this.disableLock = new Lock();
    }

    public registerSound(id: string, sound: Sound): void {
        this.soundsToIdMap.push(sound, id);
    }

    public getSound(id: string): Sound {
        return this.soundsToIdMap.getItem(id);
    }

    public addDisableLock(locker: any): void {
        this.disableLock.lock(locker);
        this.commitData();
    }

    public removeDisableLock(locker: any): void {
        this.disableLock.unlock(locker);
        this.commitData();
    }

    protected volume: number = 1;

    protected commitData(): void {
        super.commitData();

        let newVolume: number = this.getVolume();
        if (this.disableLock.isLocked) {
            newVolume = 0;
        }
        // this.internalSetVolume(newVolume);
        this.internalSetVolume(newVolume)
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(value: number): void {
        TweenLite.killTweensOf(this);
        this.volume = value;

        this.commitData();
    }
    protected abstract internalSetVolume(value: number): void;

    public tweenVolume(volume: number, time?: number, onComplete?: Function): void {
        if (!time && time !== 0) {
            time = this.defaultTweenTime;
        }

        this.tweenVolumeValue = this.getVolume();

        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            time,
            {
                tweenVolumeValue: volume,

                onComplete: () => {
                    if (onComplete) {
                        onComplete();
                    }
                }
            }
        );
    }

    protected get tweenVolumeValue(): number {
        return this._tweenVolumeValue;
    }
    protected set tweenVolumeValue(value: number) {
        if (value === this._tweenVolumeValue) {
            return;
        }

        this._tweenVolumeValue = value;
        this.setVolume(this._tweenVolumeValue);
    }

}