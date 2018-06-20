var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Text, BitmapText, Graphics, FContainer, Align, VAlign } from "../../../../../index";
var FLabel = /** @class */ (function (_super) {
    __extends(FLabel, _super);
    function FLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FLabel.prototype.construction = function (config) {
        _super.prototype.construction.call(this);
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
    };
    FLabel.prototype.createField = function () {
        if (this.field) {
            this.field.parent.removeChild(this.field);
            this.field = null;
        }
        if (this.config.isBitmap) {
            this.field = new BitmapText("", {
                font: {
                    name: this.config.font,
                    size: this.config.size
                },
                tint: this.config.color
            });
        }
        else {
            this.field = new Text();
        }
        this.applyStyle();
        this.addChild(this.field);
        this.field.mask = this.fieldMask;
    };
    FLabel.prototype.applyStyle = function () {
        if (this.config.isBitmap) {
            // ToDo: implement configuring bitmap fields
        }
        else {
            var textField = this.field;
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
    };
    FLabel.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.arrange();
    };
    FLabel.prototype.arrange = function () {
        _super.prototype.arrange.call(this);
        if (this.autosize) {
            this._width = this.field.width;
            this._height = this.field.height;
        }
        this.fieldMask.width = this._width;
        this.fieldMask.height = this._height;
        this.bg.width = this._width;
        this.bg.height = this._height;
        var newX = 0;
        switch (this.align) {
            case Align.CENTER:
                newX = Math.floor((this._width - (this.textWidth * this.field.scale.x)) * 0.5);
                break;
            case Align.RIGHT:
                newX = Math.floor(this._width - (this.textWidth * this.field.scale.x));
                break;
        }
        this.field.x = newX;
        var newY = 0;
        switch (this.valign) {
            case VAlign.MIDDLE:
                newY = Math.floor((this._height - (this.textHeight * this.field.scale.y)) * 0.5);
                break;
            case VAlign.BOTTOM:
                newY = Math.floor(this._height - (this.textHeight * this.field.scale.y));
                break;
        }
        this.field.y = newY;
    };
    Object.defineProperty(FLabel.prototype, "isBitmap", {
        get: function () {
            return this.config.isBitmap;
        },
        set: function (value) {
            if (value === this.config.isBitmap) {
                return;
            }
            this.config.isBitmap = value;
            this.createField();
            this.updateBg();
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "font", {
        get: function () {
            return this.config.font;
        },
        set: function (value) {
            if (value === this.config.font) {
                return;
            }
            this.config.font = value;
            this.applyStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "color", {
        get: function () {
            return this.config.color;
        },
        set: function (value) {
            if (value === this.config.color) {
                return;
            }
            this.config.color = value;
            this.applyStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "size", {
        get: function () {
            return this.config.size;
        },
        set: function (value) {
            if (value === this.config.size) {
                return;
            }
            this.config.size = value;
            this.applyStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (value === this._width) {
                return;
            }
            this._width = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "align", {
        get: function () {
            return this.config.align;
        },
        set: function (value) {
            if (value === this.config.align) {
                return;
            }
            this.config.align = value;
            this.arrange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "valign", {
        get: function () {
            return this.config.valign;
        },
        set: function (value) {
            if (value === this.config.valign) {
                return;
            }
            this.config.valign = value;
            this.arrange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "bgAlpha", {
        get: function () {
            return this.config.bgAlpha;
        },
        set: function (value) {
            if (value === this.config.bgAlpha) {
                return;
            }
            this.config.bgAlpha = value;
            this.updateBg();
            this.arrange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "bgColor", {
        get: function () {
            return this.config.bgColor;
        },
        set: function (value) {
            if (value === this.config.bgColor) {
                return;
            }
            this.config.bgColor = value;
            this.updateBg();
            this.arrange();
        },
        enumerable: true,
        configurable: true
    });
    FLabel.prototype.updateBg = function () {
        var bgColor = this.config.bgColor ? this.config.bgColor : 0;
        var bgAlpha = this.config.bgAlpha ? this.config.bgAlpha : 0;
        this.bg.clear();
        this.bg.beginFill(bgColor, bgAlpha);
        this.bg.drawRect(0, 0, 10, 10);
        this.bg.endFill();
        this.fieldMask.clear();
        this.fieldMask.beginFill(0x00FF00, 1);
        this.fieldMask.drawRect(0, 0, 10, 10);
        this.fieldMask.endFill();
    };
    Object.defineProperty(FLabel.prototype, "text", {
        get: function () {
            return this.field.text;
        },
        set: function (value) {
            if (value === this.field.text) {
                return;
            }
            this.field.text = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "autosize", {
        get: function () {
            return this.config.autosize;
        },
        set: function (value) {
            if (value === this.config.autosize) {
                return;
            }
            this.config.autosize = value;
            this.arrange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "textWidth", {
        get: function () {
            if (this.isBitmap) {
                return this.field.textWidth;
            }
            else {
                return this.field.width / this.field.scale.x;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FLabel.prototype, "textHeight", {
        get: function () {
            if (this.isBitmap) {
                return this.field.textHeight;
            }
            else {
                return this.field.height / this.field.scale.y;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FLabel;
}(FContainer));
export { FLabel };
//# sourceMappingURL=FLabel.js.map