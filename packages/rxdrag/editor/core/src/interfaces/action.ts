import { CanvasWidthLimits, ViewType } from "./document"
import { RelativePosition } from "../utils/coordinate"
import { Action } from "redux"
import { DocumentSelectionMode, ID, Identifier, IXYCoord, ThemeMode } from "./types"

export interface IAction<Payload> extends Action<Identifier> {
	payload?: Payload
}

export type ActionCreator<Payload> = (args: unknown[]) => IAction<Payload>

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

export type DragOverOptions = {
	type: AcceptType
	targetId: ID;
	position: RelativePosition | null;
}

export interface IActions {
	//用来操作状态的动作
	dragover(options: DragOverOptions | null): void
	startDragResource(options: StartDragResourceOptions): void
	endDragResource(): void
	startDragNodes(options: StartDragNodesOptions): void
	endDragNodes(): void
	selectNodes(targets: ID[]): void
	setSelectionMode(documentId: string, mode: DocumentSelectionMode): void
	changeActivedDocument(documentId: ID | null): void
	setThemeMode(mode: ThemeMode): void
	activeNode(nodeId?: ID | null): void
	changeCanvasWidth(documentId: ID, width: number | null): void
	changeCanvasWidthLimits(documentId: ID, limits: CanvasWidthLimits | null): void
	changeDocumentView(documentId: ID, viewType: ViewType): void
}