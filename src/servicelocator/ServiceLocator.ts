import {Dictionary, IConstructor} from "fcore";

import {
    ICreateConfig
} from "../index";

export class ServiceLocator {

    private static injectionsMap: Dictionary<IConstructor, IInjection> = new Dictionary<IConstructor, IInjection>();

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

    static add(item: IConstructor, toSubstitute?: IConstructor, config?: ICreateConfig): void {
        let tempInjection: IInjection = ServiceLocator.getInjection(item);

        if (toSubstitute) {
            tempInjection.toSubstitute = toSubstitute;

            let toSubstituteInjection: IInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);
            toSubstituteInjection.substitution = item;
        }

        if (config) {
            tempInjection.config = config;

        } else {
            if (toSubstitute) {
                let toSubstituteInjection: IInjection = ServiceLocator.getInjection(tempInjection.toSubstitute);

                // If there is no config for the item, but there is a config for the item which should be substituted,
                // then use the item-to-be-substituted config.
                if (toSubstituteInjection.config) {
                    tempInjection.config = toSubstituteInjection.config;
                }
            }
        }
    }

    static getInstance<Type extends any>(item: IConstructor, ...args): Type {

        let result: Type;

        let tempInjection: IInjection = ServiceLocator.getInjection(item);
        if (tempInjection.config && tempInjection.config.isSingletone) {
            if (!tempInjection.singletoneInstance) {
                tempInjection.singletoneInstance = (new tempInjection.item(args) as Type);
            }

            result = tempInjection.singletoneInstance;

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
}

interface IInjection {
    item: IConstructor;
    config?: ICreateConfig;

    substitution?: IConstructor;
    toSubstitute?: IConstructor;

    singletoneInstance?: any;
}

// Shortcuts
export const getInstance: typeof ServiceLocator.getInstance = ServiceLocator.getInstance;