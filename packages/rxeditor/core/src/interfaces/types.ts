import {ID as SharedID} from "@rxdrag/shared"

export type Identifier = string | symbol
export type SourceType = Identifier
export type TargetType = Identifier | Identifier[]
export type Unsubscribe = () => void
export type Listener = () => void
export type ThemeMode = "light" | "dark"
export type ID = SharedID

export interface IXYCoord{
	x: number
	y: number
}

export interface IRect {
	x: number,
	y: number,
	width: number,
	height: number,
}

export interface ISize{
	width: number,
	height: number,
}

export enum NodeStatus {
	Normal = "normal",
	Disabled = "disabled"
}

export enum NodeType {
	Node = "node",
	Resource = "resource",
	AuxWidget = "aux-widget"
}

//===============================================
// HTML Dom 附加属性，驱动模块根据该属性识别节点
export const RXID_ATTR_NAME = "rx-id"
export const RX_NODE_TYPE_ATTR_NAME = "rx-node-type" //对应枚举NodeType
export const RX_STATUS_ATTR_NAME = "rx-status" //对应枚举NodeStatus

export type RxProps = {
	[RXID_ATTR_NAME]: ID,
	[RX_NODE_TYPE_ATTR_NAME]?: NodeType, //默认为Normal
	[RX_STATUS_ATTR_NAME]?: NodeStatus //默认为Normal
}
//<<<=============================================

export enum DocumentSelectionMode {
	Normal = "normal",
	RangeSelection = "rangeSelection"
}

