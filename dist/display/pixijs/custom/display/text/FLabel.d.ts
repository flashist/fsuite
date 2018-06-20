/// <reference types="pixi.js" />
import { Text, BitmapText, IFLabelConfig, Graphics, FContainer } from "../../../../../index";
export declare class FLabel extends FContainer {
    protected config: IFLabelConfig;
    protected fieldMask: Graphics;
    protected bg: Graphics;
    protected field: Text | BitmapText;
    private _height;
    private _width;
    protected construction(config: IFLabelConfig): void;
    protected createField(): void;
    protected applyStyle(): void;
    protected commitData(): void;
    protected arrange(): void;
    isBitmap: boolean;
    font: string;
    color: number;
    size: number;
    width: number;
    height: number;
    align: string;
    valign: string;
    bgAlpha: number;
    bgColor: number;
    private updateBg();
    text: string;
    autosize: boolean;
    readonly textWidth: number;
    readonly textHeight: number;
}
