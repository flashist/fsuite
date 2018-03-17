import { AssociativeArray, BaseObject } from "fcore";
import { IGenericObjectVO } from "./IGenericObjectVO";
import { IGenericObjectChangeVO } from "./IGenericObjectChangeVO";
export declare class GenericObjectsModel<ItemType extends IGenericObjectVO = IGenericObjectVO> extends BaseObject {
    protected items: AssociativeArray<ItemType>;
    parseSource(source: IGenericObjectChangeVO): void;
    getItem(id: string, isNeedToCreate?: boolean): ItemType;
    removeItem(id: string): void;
    readonly itemsCount: number;
    protected createEmpty(id: string): ItemType;
    protected updateItem(item: ItemType, source: any): void;
    getItems(): ItemType[];
}
