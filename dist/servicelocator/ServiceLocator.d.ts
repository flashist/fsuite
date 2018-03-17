import { IConstructor } from "fcore";
import { ICreateConfig } from "../index";
export declare class ServiceLocator {
    private static injectionsMap;
    static activate(): void;
    static add(item: IConstructor, toSubstitute?: IConstructor, config?: ICreateConfig): void;
    static getInstance<Type extends any>(item: IConstructor, ...args: any[]): Type;
    private static getInjection(item);
}
export declare const getInstance: typeof ServiceLocator.getInstance;
