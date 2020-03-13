import {AutosizeType} from "./AutosizeType";

export interface IFLabelConfig {
    isBitmap?: boolean;
    bgColor?: number;
    bgAlpha?: number;
    autosize?: boolean;
    autosizeType?: AutosizeType;
    fitToSize?: boolean;

    fontFamily?: string;
    size?: number;
    color?: number;
    align?: string;
    valign?: string;
    bold?: boolean;

    dropShadow?: boolean;
    dropShadowColor?: number;
    dropShadowAlpha?: number;
    dropShadowDistance?: number;
    dropShadowAngle?: number;
    dropShadowBlur?: number;


    stroke?: number;
    strokeThickness?: number;
}