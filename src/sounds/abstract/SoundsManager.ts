import {AssociativeArray, BaseObject} from "fcore";

import {AbstractSound} from "./AbstractSound";

export class SoundsManager extends BaseObject {

    protected soundsToIdMap: AssociativeArray<AbstractSound> = new AssociativeArray<AbstractSound>();

    public registerSound(id: string, sound: AbstractSound): void {
        this.soundsToIdMap.push(sound, id);
    }

    public getSound(id: string): AbstractSound {
        return this.soundsToIdMap.getItem(id);
    }

}