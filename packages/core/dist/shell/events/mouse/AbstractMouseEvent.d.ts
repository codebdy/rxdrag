import { ID, NodeStatus, NodeType } from "interfaces";
import { IEventData } from "../eventdata";
export interface NodeRxInfo {
    rxId?: ID;
    nodeType?: NodeType;
    nodeStatus?: NodeStatus;
}
export interface IMouseEventOriginData extends IEventData {
    offsetX: number;
    offsetY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    target: EventTarget | null;
    targetRx?: NodeRxInfo | null;
    view: Window | null;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
}
export interface IMouseEventData extends IMouseEventOriginData {
    topClientX?: number;
    topClientY?: number;
    topPageX?: number;
    topPageY?: number;
}
export declare class AbstractMouseEvent {
    data: IMouseEventData;
    orginalEvent: MouseEvent;
    constructor(data: IMouseEventOriginData, e: MouseEvent);
    private getRxProps;
    transformCoordinates(): void;
}
