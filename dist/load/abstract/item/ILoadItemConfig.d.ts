export interface ILoadItemConfig {
    src: string;
    id?: string;
    basePath?: string;
    fileType?: string;
    priority?: number;
    loadGroup?: string;
    labels?: string[];
    uniqueId?: string;
}
