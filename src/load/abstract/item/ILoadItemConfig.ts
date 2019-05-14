export interface ILoadItemConfig {
    src: string;

    id?: string;
    basePath?: string;
    fileType?: string;
    extensions?: string[];

    priority?: number;
    loadGroup?: string;
    labels?: string[];

    uniqueId?: string;


}