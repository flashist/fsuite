export interface IGenericObjectVO {
    id: string;
    type: string;

    update?:(source:any) => void;
}