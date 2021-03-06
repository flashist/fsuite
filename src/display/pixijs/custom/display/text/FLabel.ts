import {Text, BitmapText, IFLabelConfig, Graphics, FContainer, Align, VAlign} from "../../../../../index";

export class FLabel extends FContainer {

    protected config: IFLabelConfig;

    protected fieldMask: Graphics;
    protected bg: Graphics;
    protected field: Text | BitmapText;

    private _height: number;
    private _width: number;

    protected construction(config: IFLabelConfig): void {
        super.construction();

        if (!config) {
            config = {};
        }
        this.config = config;

        this.bg = new Graphics();
        this.addChild(this.bg);

        this.fieldMask = new Graphics();
        this.addChild(this.fieldMask);

        this.createField();
        // First size initialization
        this._width = this.field.width;
        this._height = this.field.height;

        this.updateBg();
        this.commitData();
    }

    protected createField(): void {
        if (this.field) {
            this.field.parent.removeChild(this.field);
            this.field = null;
        }

        if (this.config.isBitmap) {
            this.field = new BitmapText(
                "",
                {
                    font: {
                        name: this.config.font,
                        size: this.config.size
                    },
                    tint: this.config.color
                }
            );
        } else {
            this.field = new Text();
        }
        this.applyStyle();

        this.addChild(this.field);
        this.field.mask = this.fieldMask;
    }

    protected applyStyle(): void {
        if (this.config.isBitmap) {
            // ToDo: implement configuring bitmap fields

        } else {
            const textField: Text = (this.field as Text);
            if (this.config.font) {
                textField.style.fontFamily = this.config.font;
            }
            if (this.config.size) {
                textField.style.fontSize = this.config.size;
            }
            if (this.config.color) {
                textField.style.fill = this.config.color;
            }
        }
    }


    protected commitData(): void {
        super.commitData();

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        if (this.autosize) {
            this._width = this.field.width;
            this._height = this.field.height;
        }

        this.fieldMask.width = this._width;
        this.fieldMask.height = this._height;

        this.bg.width = this._width;
        this.bg.height = this._height;

        let newX: number = 0;
        switch (this.align) {
            case Align.CENTER:
                newX = Math.floor((this._width - (this.textWidth * this.field.scale.x)) * 0.5);
                break;
            case Align.RIGHT:
                newX = Math.floor(this._width - (this.textWidth * this.field.scale.x));
                break;
        }
        this.field.x = newX;

        let newY: number = 0;
        switch (this.valign) {
            case VAlign.MIDDLE:
                newY = Math.floor((this._height - (this.textHeight * this.field.scale.y)) * 0.5);
                break;
            case VAlign.BOTTOM:
                newY = Math.floor(this._height - (this.textHeight * this.field.scale.y));
                break;
        }
        this.field.y = newY;
    }


    public get isBitmap(): boolean {
        return this.config.isBitmap;
    }

    public set isBitmap(value: boolean) {
        if (value === this.config.isBitmap) {
            return;
        }

        this.config.isBitmap = value;

        this.createField();
        this.updateBg();
        this.commitData();
    }

    public get font(): string {
        return this.config.font;
    }

    public set font(value: string) {
        if (value === this.config.font) {
            return;
        }

        this.config.font = value;

        this.applyStyle();
    }

    public get color(): number {
        return this.config.color;
    }

    public set color(value: number) {
        if (value === this.config.color) {
            return;
        }

        this.config.color = value;

        this.applyStyle();
    }

    public get size(): number {
        return this.config.size;
    }

    public set size(value: number) {
        if (value === this.config.size) {
            return;
        }

        this.config.size = value;

        this.applyStyle();
    }

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        if (value === this._width) {
            return;
        }

        this._width = value;

        this.commitData();
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        if (value === this._height) {
            return;
        }

        this._height = value;

        this.commitData();
    }


    public get align(): string {
        return this.config.align;
    }

    public set align(value: string) {
        if (value === this.config.align) {
            return;
        }

        this.config.align = value;

        this.arrange();
    }


    public get valign(): string {
        return this.config.valign;
    }

    public set valign(value: string) {
        if (value === this.config.valign) {
            return;
        }

        this.config.valign = value;

        this.arrange();
    }


    public get bgAlpha(): number {
        return this.config.bgAlpha;
    }

    public set bgAlpha(value: number) {
        if (value === this.config.bgAlpha) {
            return;
        }

        this.config.bgAlpha = value;

        this.updateBg();
        this.arrange();
    }

    public get bgColor(): number {
        return this.config.bgColor;
    }

    public set bgColor(value: number) {
        if (value === this.config.bgColor) {
            return;
        }

        this.config.bgColor = value;

        this.updateBg();
        this.arrange();
    }

    private updateBg(): void {

        const bgColor = this.config.bgColor ? this.config.bgColor : 0;
        const bgAlpha = this.config.bgAlpha ? this.config.bgAlpha : 0;

        this.bg.clear();
        this.bg.beginFill(bgColor, bgAlpha);
        this.bg.drawRect(0, 0, 10, 10);
        this.bg.endFill();

        this.fieldMask.clear();
        this.fieldMask.beginFill(0x00FF00, 1);
        this.fieldMask.drawRect(0, 0, 10, 10);
        this.fieldMask.endFill();
    }

    public get text(): string {
        return this.field.text;
    }

    public set text(value: string) {
        if (value === this.field.text) {
            return;
        }

        this.field.text = value;

        this.commitData();
    }

    public get autosize(): boolean {
        return this.config.autosize;
    }

    public set autosize(value: boolean) {
        if (value === this.config.autosize) {
            return;
        }

        this.config.autosize = value;

        this.arrange();
    }

    get textWidth() {
        if (this.isBitmap) {
            return (this.field as BitmapText).textWidth;
        } else {
            return this.field.width / this.field.scale.x;
        }
    }

    get textHeight() {
        if (this.isBitmap) {
            return (this.field as BitmapText).textHeight;
        } else {
            return this.field.height / this.field.scale.y;
        }
    }
}