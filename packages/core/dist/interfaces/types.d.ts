export type Identifier = string | symbol;
export type SourceType = Identifier;
export type TargetType = Identifier | Identifier[];
export type Unsubscribe = () => void;
export type Listener = () => void;
export type ID = string;
export interface IXYCoord {
    x: number;
    y: number;
}
export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare enum NodeStatus {
    Normal = "normal",
    Disabled = "disabled"
}
export declare enum NodeType {
    Node = "node",
    Resource = "resource",
    AuxWidget = "aux-widget"
}
export declare const RXID_ATTR_NAME = "rx-id";
export declare const RX_NODE_TYPE_ATTR_NAME = "rx-node-type";
export declare const RX_STATUS_ATTR_NAME = "rx-status";
export type RxProps = {
    [RXID_ATTR_NAME]: ID;
    [RX_NODE_TYPE_ATTR_NAME]?: NodeType;
    [RX_STATUS_ATTR_NAME]?: NodeStatus;
};
export declare enum DocumentSelectionMode {
    Normal = "normal",
    RangeSelection = "rangeSelection"
}
