import {AutosizeType} from "./AutosizeType";

export interface IFLabelConfig {
    isBitmap?: boolean;
    bgColor?: number;
    bgAlpha?: number;
    autosize?: boolean;
    autosizeType?: AutosizeType;

    fontFamily?: string;
    size?: number;
    color?: number;
    align?: string;
    valign?: string;
    bold?: boolean;

    dropShadow?: boolean;
}