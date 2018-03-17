import {AssociativeArray, BaseObject} from "fcore";

import {IGenericObjectVO} from "./IGenericObjectVO";
import {IGenericObjectChangeVO} from "./IGenericObjectChangeVO";
import {ChangeActionType} from "./ChangeActionType";

export class GenericObjectsModel<ItemType extends IGenericObjectVO = IGenericObjectVO> extends BaseObject {

    protected items: AssociativeArray<ItemType> = new AssociativeArray<ItemType>();

    public parseSource(source: IGenericObjectChangeVO): void {
        switch (source.action) {
            case ChangeActionType.REMOVE:
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

    public removeItem(id: string): void {
        this.items.removeByKey(id);
    }

    public get itemsCount(): number {
        return this.items.length;
    }

    protected createEmpty(id: string): ItemType {
        return ({id: id, type: ""} as ItemType);
    }

    protected updateItem(item: ItemType, source: any): void {
        if (item.update) {
            item.update(source);
        } else {
            (Object as any).assign(item, source);
        }
    }

    public getItems(): ItemType[] {
        return this.items.getAllItems();
    }
}