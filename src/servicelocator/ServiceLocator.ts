import {Dictionary, IConstructor} from "fcore";

import {
    ICreateConfig
} from "../index";
import {IActivatee} from "./IActivatee";

export class ServiceLocator {

    private static injectionsMap: Dictionary<IConstructor, IInjection> = new Dictionary<IConstructor, IInjection>();

    private static activatorToActivateesMap: Dictionary<any, IActivatee[]> = new Dictionary<any, IActivatee[]>();

    static activate(): void {
        let tempInjection: IInjection;
        const keys: IConstructor[] = ServiceLocator.injectionsMap.getKeys();
        for (let prop of keys) {
            tempInjection = ServiceLocator.injectionsMap.getItem(prop);
            if (tempInjection.config) {
                if (tempInjection.config.forceCreation) {
                    ServiceLocator.getInstance(tempInjection.item);
                }
            }
        }
    }

    static add(item: IConstructor, config?: ICreateConfig): void {
        let tempInjection: IInjection = ServiceLocator.getInjection(item);

        if (config.toSubstitute) {
            tempInjection.toSubstitute = config.toSubstitute;

            let toSubstituteInjection: IInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);
            toSubstituteInjection.substitution = item;
        }

        if (config) {
            tempInjection.config = config;

        } else {
            if (config.toSubstitute) {
                let toSubstituteInjection: IInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);

                // If there is no config for the item, but there is a config for the item which should be substituted,
                // then use the item-to-be-substituted config.
                if (toSubstituteInjection.config) {
                    tempInjection.config = toSubstituteInjection.config;
                }
            }
        }
    }

    static getInstance<Type extends any>(item: IConstructor<Type>, ...args): Type {

        let result: Type;

        let tempInjection: IInjection = ServiceLocator.getInjection(item);
        if (tempInjection.config && tempInjection.config.isSingleton) {
            if (!tempInjection.singletonInstance) {
                tempInjection.singletonInstance = (new tempInjection.item(args) as Type);
            }

            result = tempInjection.singletonInstance;

        } else {
            result = (new tempInjection.item(args) as Type);
        }

        return result;
    }

    private static getInjection(item: IConstructor): IInjection {
        // Create if not created yet
        if (!ServiceLocator.injectionsMap.getItem(item)) {
            ServiceLocator.injectionsMap.addItem(
                item,
                {
                    item: item
                }
            );
        }

        let result: IInjection = ServiceLocator.injectionsMap.getItem(item);
        if (result.substitution) {
            result = ServiceLocator.getInjection(result.substitution);
        }

        return result;
    }

    public static processItemOnActivate(item: any): void {
        if (!item.constructor) {
            return;
        }

        let tempInjection: IInjection = ServiceLocator.getInjection(item.constructor);
        let activateesConstructors: IConstructor<IActivatee>[] = ServiceLocator.getChainActivateesConstructors(tempInjection);
        if (activateesConstructors && activateesConstructors.length > 0) {

            let activateesList: IActivatee[] = ServiceLocator.activatorToActivateesMap.getItem(item);
            if (!activateesList) {
                activateesList = [];
                ServiceLocator.activatorToActivateesMap.addItem(item, activateesList);
            }

            let activateesCount: number = activateesConstructors.length;
            for (let activateeIndex: number = 0; activateeIndex < activateesCount; activateeIndex++) {
                let TempActivateeClass: IConstructor<IActivatee> = activateesConstructors[activateeIndex]
                let tempActivatee = ServiceLocator.getInstance(TempActivateeClass);
                tempActivatee.onActivatorStart(item);

                activateesList.push(tempActivatee);
            }
        }
    }

    public static processItemOnDeactivate(item: any): void {
        let activateesList: IActivatee[] = ServiceLocator.activatorToActivateesMap.getItem(item);
        if (!activateesList) {
            return;
        }

        let activateesCount: number = activateesList.length;
        for (let activateeIndex: number = 0; activateeIndex < activateesCount; activateeIndex++) {
            let tempActivatee: IActivatee = activateesList[activateeIndex];
            tempActivatee.onActivatorEnd();
        }

        // Clear information about activator-to-activatee map
        ServiceLocator.activatorToActivateesMap.removeItemByKey(item);
    }

    private static getChainActivateesConstructors(item: IInjection): IConstructor<IActivatee>[] {
        let result: IConstructor<IActivatee>[] = [];

        if (item.config) {
            // Do while there is no information about the constructor,
            // which should be created on activation
            // and while there is an object in the substitue chain, which might have such information
            while (item.config.activateesConstructors) {
                if (item.config.activateesConstructors) {
                    result.push(...item.config.activateesConstructors);
                }

                if (item.toSubstitute) {
                    item = ServiceLocator.getInjection(item.toSubstitute);
                } else {
                    break;
                }
            }
        }

        return result;
    }
}

interface IInjection {
    item: IConstructor;
    config?: ICreateConfig;

    substitution?: IConstructor;
    toSubstitute?: IConstructor;

    singletonInstance?: any;
}

// Shortcuts
export const getInstance: typeof ServiceLocator.getInstance = ServiceLocator.getInstance;
export const serviceLocatorAdd: typeof ServiceLocator.add = ServiceLocator.add;
export const serviceLocatorProcessItemOnActivate: typeof ServiceLocator.processItemOnActivate = ServiceLocator.processItemOnActivate;
export const serviceLocatorProcessItemOnDeactivate: typeof ServiceLocator.processItemOnDeactivate = ServiceLocator.processItemOnDeactivate;