import {GenericObjectChangeActionType} from "./GenericObjectChangeActionType";

export interface IGenericObjectVO {
    id?: string;
    type?: string;

    action?: GenericObjectChangeActionType;
    update?:(source:any) => void;

    // This is needed because since some typescript version it's not possible
    // to use object with fields, not described in an interface
    [key: string]: any;
}