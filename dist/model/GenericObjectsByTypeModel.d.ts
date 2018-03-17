import { AssociativeArray } from "fcore";
import { IGenericObjectChangeVO } from "./IGenericObjectChangeVO";
import { GenericObjectsModel } from "./GenericObjectsModel";
export declare class GenericObjectsByTypeModel {
    protected modelsToTypeMap: AssociativeArray<GenericObjectsModel>;
    commitItems(items: IGenericObjectChangeVO[]): void;
    protected getModelForType(type: string): GenericObjectsModel;
    mapModelToType(model: GenericObjectsModel, type: string): void;
}
