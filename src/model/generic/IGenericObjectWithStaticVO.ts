import {IGenericObjectVO} from "./IGenericObjectVO";

export interface IGenericObjectWithStaticVO extends IGenericObjectVO {
    staticId?: string;
    staticType?: string;
}