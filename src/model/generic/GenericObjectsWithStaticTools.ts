import {IGenericObjectVO} from "./IGenericObjectVO";
import {IGenericObjectWithStaticVO} from "./IGenericObjectWithStaticVO";
import {GenericObjectsByTypeModel} from "./GenericObjectsByTypeModel";
import {getInstance} from "../..";

export class GenericObjectsWithStaticTools {
    static getStaticObject<StaticType extends IGenericObjectVO = IGenericObjectVO>(object: IGenericObjectWithStaticVO): StaticType {
        let result: StaticType;

        if (object.staticType && object.staticId) {
            const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
            result = genericByTypeModel.getItem(object.staticType, object.staticId);
        }

        return result;
    }
}