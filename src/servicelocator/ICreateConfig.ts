import {IConstructor} from "fcore";
import {IActivatee} from "./IActivatee";

export interface ICreateConfig {
    toSubstitute?: IConstructor,

    isSingleton?: boolean;
    forceCreation?: boolean;

    activateesConstructors?: IConstructor<IActivatee>[];
}