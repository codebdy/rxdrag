import { State } from "core/reducers"
import { DraggingNodesState } from "core/reducers/draggingNodes"
import { DraggingResourceState } from "core/reducers/draggingResource"
import { DragOverState } from "core/reducers/dragOver"
import { ThemeMode } from "./action"
import { CanvasWidthLimits, ISnapshot, ITreeNode, NodeListener, ViewType } from "./document"
import { DocumentSelectionMode } from "./types"

import { Listener, ID, Unsubscribe } from "./types"

export type DraggingNodesListener = (dragging: DraggingNodesState | null) => void
export type DraggingResourceListener = (dragging: DraggingResourceState | null) => void
export type SelectedChangeListener = (selectedIds: ID[] | null, documentId: ID) => void
export type CurrentNodesChangeListener = (node: ITreeNode) => void
export type DragOverListener = (dragover: DragOverState | null) => void
export type LangListener = (lang: string) => void
export type ThemeModeListener = (mode: ThemeMode) => void
export type ActiveDocumentListener = (documentId: ID | null) => void
export type ActiveNodeListener = (nodeId?: ID | null) => void
export type HistoryListener = (history: ISnapshot[]) => void
export type SnapshotIndexListener = (index: number) => void
export type CanvasWidthListener = (index: number | null) => void
export type CanvasWidthLimitsListener = (limits: CanvasWidthLimits | null) => void
export type DocumentViewListener = (viewType: ViewType) => void
export type SelectionModeListener = (mode: DocumentSelectionMode) => void

export interface IMonitor {
	subscribeToStateChange(
		listener: Listener,
	): Unsubscribe
	subscribeToDraggingNodes(listener: DraggingNodesListener): Unsubscribe
	subscribeToDraggingResource(listener: DraggingResourceListener): Unsubscribe
	subscribeToDragOver(listener: DragOverListener): Unsubscribe
	subscribeToSelectChange(listener: SelectedChangeListener): Unsubscribe
	subscribeToCurrentNodeChanged(listener: CurrentNodesChangeListener): Unsubscribe
	subscribeToNodeChanged(nodeId: ID, listener: NodeListener): Unsubscribe
	subscribeToHasNodeChanged(listener: Listener): Unsubscribe
	subscribeToLangeChange(listener: LangListener): Unsubscribe
	subscribeToThemeModeChange(listener: ThemeModeListener): Unsubscribe
	subscribeToActiveDocumentChanged(listener: ActiveDocumentListener): Unsubscribe
	subscribeToActiveChanged(listener: ActiveNodeListener): Unsubscribe
	subscribeToHistoryChange(documentId: ID, listener: HistoryListener): Unsubscribe
	subscribeToSnapshotIndexChange(documentId: ID, listener: SnapshotIndexListener): Unsubscribe
	subscribeToCanvasWidthChange(documentId: ID, listener: CanvasWidthListener): Unsubscribe
	subscribeToCanvasWidthLimitsChange(documentId: ID, listener: CanvasWidthLimitsListener): Unsubscribe
	subscribeToDocumentViewChange(documentId: ID, listener: DocumentViewListener): Unsubscribe
	subscribeToSelectionMode(documentId: ID, listener: SelectionModeListener): Unsubscribe

	//onViewPortResizeOrScroll(listener: Listener): Unsubscribe
	isDragging(): boolean
	getCurrentSelectedIds(): ID[] | null
	getDocumentSelectedIds(doumentId: ID): ID[] | null
	getNode(nodeId: ID): ITreeNode | null
	getNodeDocumentId(nodeId: ID): ID | undefined
	getDocumentRootNode(doumentId: ID): ITreeNode | null
	getCurrentNode(): ITreeNode | null
	getCurrentTree(): ITreeNode | null
	getDrageOver(): DragOverState
	getState(): State
	getSelectionMode(document: ID): DocumentSelectionMode
	//getDragging(): Dragging|null
}
