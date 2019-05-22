import {Lock, AssociativeArray, BaseObject} from "fcore";

import {TweenLite} from "gsap";

import {Sound} from "../../index";
import {SoundsManagerEvent} from "./SoundsManagerEvent";

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
        const prevEnabled: boolean = this.enabled;

        this.disableLock.lock(locker);
        if (this.enabled !== prevEnabled) {
            this.dispatchEvent(SoundsManagerEvent.ENABLED_CHANGE);
        }

        this.commitData();
    }

    public removeDisableLock(locker: any): void {
        const prevEnabled: boolean = this.enabled;

        this.disableLock.unlock(locker);
        if (this.enabled !== prevEnabled) {
            this.dispatchEvent(SoundsManagerEvent.ENABLED_CHANGE);
        }

        this.commitData();
    }

    public get enabled(): boolean {
        return !this.disableLock.isLocked;
    }

    protected volume: number = 1;

    protected commitData(): void {
        super.commitData();

        let newVolume: number = 0;
        if (this.enabled) {
            newVolume = this.getVolume();
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

        this.dispatchEvent(SoundsManagerEvent.VOLUME_CHANGE);

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