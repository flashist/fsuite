/// <reference types="pixi.js" />
import { TextTruncateType, Text } from "../../../../index";
export declare class TextTools {
    static truncateToFit(field: Text, maxWidth?: number, maxHeight?: number, truncateType?: TextTruncateType, afterTruncateText?: string): boolean;
}
