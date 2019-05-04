import {AssociativeArray} from "fcore";

import {GenericObjectsModel} from "./GenericObjectsModel";
import {IGenericObjectVO} from "./IGenericObjectVO";

export class GenericObjectsByTypeModel {
    protected modelsToTypeMap: AssociativeArray<GenericObjectsModel> = new AssociativeArray<GenericObjectsModel>();

    public commitItems(items: IGenericObjectVO[]): void {
        let tempModel: GenericObjectsModel;
        for (let sourceItem of items) {
            tempModel = this.getModelForType(sourceItem.type);
            tempModel.parseSource(sourceItem);
        }
    }

    protected getModelForType(type: string): GenericObjectsModel {
        let result: GenericObjectsModel = this.modelsToTypeMap.getItem(type);
        if (!result) {
            result = new GenericObjectsModel();
            result.defaultItemsType = type;

            this.mapModelToType(result, type);
        }

        return result;
    }

    public getItem(type: string, id: string): IGenericObjectVO {
        const typeModel: GenericObjectsModel = this.getModelForType(type);
        return typeModel.getItem(id);
    }

    public getItemsForType(type: string): IGenericObjectVO[] {
        const typeModel: GenericObjectsModel = this.getModelForType(type);
        return typeModel.getItems();
    }

    public mapModelToType(model: GenericObjectsModel, type: string): void {
        this.modelsToTypeMap.push(model, type);
    }
}