﻿import {Logger, ObjectTools, BaseEventDispatcher} from "fcore";

import {IGenericObjectVO} from "../..";
import {BaseDataVOEvent} from "./BaseDataVOEvent";

export class BaseDataVO extends BaseEventDispatcher implements IGenericObjectVO {

    public type: string = "";
    public id: string = "";

    update(source: any): void {
        const isChanged: boolean = ObjectTools.copyProps(this, source);

        if (isChanged) {
            this.dispatchEvent(BaseDataVOEvent.CHANGE);
        }
    }
}