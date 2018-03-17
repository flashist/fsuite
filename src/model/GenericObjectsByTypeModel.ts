import {AssociativeArray} from "fcore";

import {IGenericObjectChangeVO} from "./IGenericObjectChangeVO";
import {GenericObjectsModel} from "./GenericObjectsModel";

export class GenericObjectsByTypeModel {
    protected modelsToTypeMap: AssociativeArray<GenericObjectsModel> = new AssociativeArray<GenericObjectsModel>();

    public commitItems(items: IGenericObjectChangeVO[]): void {
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
            this.mapModelToType(result, type);
        }

        return result;
    }

    public mapModelToType(model: GenericObjectsModel, type: string): void {
        this.modelsToTypeMap.push(model, type);
    }
}