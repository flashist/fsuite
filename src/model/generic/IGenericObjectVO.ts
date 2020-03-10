export interface IGenericObjectVO {
    id?: string;
    type?: string;

    action?: string;
    update?:(source:any) => void;

    [key: string]: any;
}