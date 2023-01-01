import { CanvasWidthLimits, ID, Identifier, IXYCoord, ViewType, DocumentSelectionMode } from "core/interfaces"
import { RelativePosition } from "core/utils/coordinate"
import { Action } from "redux"

export interface IAction<Payload> extends Action<Identifier> {
	payload?: Payload
}

export type ActionCreator<Payload> = (args: any[]) => IAction<Payload>

export interface SentinelAction {
	type: Identifier
}

export type StartDragResourceOptions = {
	initialMousePosition: IXYCoord
	offset: IXYCoord
	resourceId: ID
	mousePosition: IXYCoord
}
export type StartDragNodesOptions = {
	initialMousePosition: IXYCoord
	offset: IXYCoord
	mousePosition: IXYCoord
	nodeIds: ID[]
}

export enum AcceptType {
	Accept = "Accept",
	Reject = "Reject"
}

export type DrageOverOptions = {
	type: AcceptType
	targetId: ID;
	position: RelativePosition | null;
}

export type ThemeMode = "light" | "dark"

export interface IActions {
	//用来操作状态的动作
	dragover(options: DrageOverOptions | null): void
	startDragResource(opitons: StartDragResourceOptions): void
	endDragResouce(): void
	startDragNodes(opitons: StartDragNodesOptions): void
	endDragNodes(): void
	selectNodes(targets: ID[], documentId: ID): void
	setSelectionMode(documentId: string, mode: DocumentSelectionMode): void
	changeActivedDocument(documentId: ID | null): void
	setThemeMode(mode: ThemeMode): void
	activeNode(nodeId?: ID | null): void
	changeCanvasWidth(documentId: ID, width: number | null): void
	changeCanvasWidthLimits(documentId: ID, limits: CanvasWidthLimits | null): void
	changeDocumentView(documentId: ID, viewType: ViewType): void
}