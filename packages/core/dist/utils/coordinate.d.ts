import { IMouseEventData } from "shell/events/mouse/AbstractMouseEvent";
import { IDesignerEngine, IRect, ITreeNode } from "interfaces";
export declare enum RelativePosition {
    In = "in",
    Left = "left",
    Top = "top",
    Right = "right",
    Bottom = "bottom"
}
export interface IDropPosition {
    position: RelativePosition | null;
    targetId: string;
}
export declare class Rect {
    rect: IRect;
    constructor(rect: IRect);
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    isIn(eventData?: IMouseEventData): boolean;
    isOnLeft(event?: IMouseEventData): boolean;
    isOnRight(event?: IMouseEventData): boolean;
    isOnTop(event?: IMouseEventData): boolean;
    isOnBottom(event?: IMouseEventData): boolean;
    atOutPosition(event: IMouseEventData | undefined, layout: "vertical" | "horizontal"): RelativePosition | null;
}
export declare class PositionJudger {
    private node;
    private engine;
    constructor(node: ITreeNode, engine: IDesignerEngine);
    get dropInMargin(): 0 | 8;
    get dragInRect(): Rect | undefined;
    get rect(): Rect | undefined;
    isDragIn(eventData: IMouseEventData): boolean | undefined;
    firstChildAfterMouse(event: IMouseEventData, node?: ITreeNode): ITreeNode | undefined;
    isAfterMouse(event: IMouseEventData, node?: ITreeNode): boolean;
    judgePosition(eventData: IMouseEventData): IDropPosition | null;
}
