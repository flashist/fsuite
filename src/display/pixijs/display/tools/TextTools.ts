import {Logger} from "fcore";

import {
    TextTruncateType,
    Text,
    FLabel
} from "../../../../index";

export class TextTools {
    static truncateToFit(field: FLabel,
                         maxWidth?: number,
                         maxHeight?: number,
                         truncateType: TextTruncateType = TextTruncateType.FROM_RIGHT,
                         afterTruncateText: string = "..."): boolean {

        if (!maxWidth || field.width <= maxWidth) {
            maxWidth = field.width;
        }
        if (!maxHeight || field.height <= maxHeight) {
            maxHeight = field.height;
        }
        if (!field.text || (field.width <= maxWidth && field.height <= maxHeight)) {
            return false;
        }

        var text = field.text;
        var cached = text;
        var maxSteps = 1000;
        var step = 0;
        while (text.length > 0 &&
        ((field.width > maxWidth) || (field.height > maxHeight))) {
            if (truncateType === TextTruncateType.FROM_LEFT) {
                text = text.substring(1, text.length);
                field.text = afterTruncateText + text;
            } else {
                text = text.substring(0, text.length - 1);
                field.text = text + afterTruncateText;
            }
            // Preventing code from "stucking"
            step++;
            if (step >= maxSteps) {
                Logger.error("TextTools | truncateToFit __ ERROR! Max steps count!");
                break;
            }
        }

        return text !== cached;
    };
}