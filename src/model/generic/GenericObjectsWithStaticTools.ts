import {IGenericObjectVO} from "./IGenericObjectVO";
import {IGenericObjectWithStaticVO} from "./IGenericObjectWithStaticVO";
import {GenericObjectsByTypeModel} from "./GenericObjectsByTypeModel";
import {getInstance} from "../..";

export class GenericObjectsWithStaticTools {
    static getStaticObject(object: IGenericObjectWithStaticVO): IGenericObjectVO {
        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        return genericByTypeModel.getItem(object.staticType, object.staticId);
    }
}