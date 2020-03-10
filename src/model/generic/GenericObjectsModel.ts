import {AssociativeArray, BaseObject, IConstructor} from "fcore";

import {IGenericObjectVO} from "./IGenericObjectVO";
import {GenericObjectChangeActionType} from "./GenericObjectChangeActionType";

export class GenericObjectsModel<ItemType extends IGenericObjectVO = IGenericObjectVO> extends BaseObject {

    protected items: AssociativeArray<ItemType> = new AssociativeArray<ItemType>();
    public itemsType: string = "";
    public DefaultItemClass: IConstructor<ItemType>;

    public parseSource(source: IGenericObjectVO): void {
        switch (source.action) {
            case GenericObjectChangeActionType.REMOVE:
                this.removeItem(source.id);
                break;

            //case ChangeActionType.UPDATE:
            default:
                this.updateItem(this.getItem(source.id), source);
                break;
        }
    }

    public getItem(id: string, isNeedToCreate: boolean = true): ItemType {
        let result = this.items.getItem(id);

        if (!result) {
            if (isNeedToCreate) {
                result = this.createEmpty(id);
                this.items.push(result, result.id);
            }
        }

        return result;
    }

    protected removeItem(id: string): void {
        this.items.removeByKey(id);
    }

    public get itemsCount(): number {
        return this.items.length;
    }

    protected createEmpty(id: string): ItemType {
        let result: ItemType = ({id: id, type: this.itemsType} as ItemType);
        if (this.DefaultItemClass) {
            result = new this.DefaultItemClass();
        }

        return result;
    }

    protected updateItem(item: ItemType, source: any): void {
        if (item.update) {
            item.update(source);
        } else {
            (Object as any).assign(item, source);
        }
    }

    public getAllItems(): ItemType[] {
        return this.items.getAllItems();
    }
}