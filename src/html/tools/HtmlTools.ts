import {
    Point
} from "../../index";

export class HtmlTools {
    static getDocumentSize(): Point {
        return new Point(
            Math.max(document.documentElement.clientWidth, window.innerWidth),
            Math.max(document.documentElement.clientHeight, window.innerHeight)
        )
    }
}