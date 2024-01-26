import { State } from "../reducers"
import { DraggingNodesState } from "../reducers/draggingNodes"
import { DraggingResourceState } from "../reducers/draggingResource"
import { DragOverState } from "../reducers/dragOver"
import { CanvasWidthLimits, ISnapshot, ITreeNode, NodeListener, ViewType } from "./document"
import { DocumentSelectionMode, ThemeMode } from "./types"

import { Listener, ID, Unsubscribe } from "./types"

export type DraggingNodesListener = (dragging: DraggingNodesState | null) => void
export type DraggingResourceListener = (dragging: DraggingResourceState | null) => void
export type SelectedChangeListener = (selectedIds: ID[] | null) => void
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
export type DocumentTitleListener = (title: string | undefined) => void
export type DocumentChangedListener = (changed: boolean) => void

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
	subscribeToLanguageChange(listener: LangListener): Unsubscribe
	subscribeToThemeModeChange(listener: ThemeModeListener): Unsubscribe
	subscribeToActiveDocumentChanged(listener: ActiveDocumentListener): Unsubscribe
	subscribeToActiveChanged(listener: ActiveNodeListener): Unsubscribe
	subscribeToHistoryChange(documentId: ID, listener: HistoryListener): Unsubscribe
	subscribeToSnapshotIndexChange(documentId: ID, listener: SnapshotIndexListener): Unsubscribe
	subscribeToCanvasWidthChange(documentId: ID, listener: CanvasWidthListener): Unsubscribe
	subscribeToCanvasWidthLimitsChange(documentId: ID, listener: CanvasWidthLimitsListener): Unsubscribe
	subscribeToDocumentViewChange(documentId: ID, listener: DocumentViewListener): Unsubscribe
	subscribeToSelectionMode(documentId: ID, listener: SelectionModeListener): Unsubscribe
	subscribeToDocumentTitle(documentId: ID, listener: DocumentTitleListener): Unsubscribe
	subscribeToDocumentsChange(listener: Listener): Unsubscribe
	subscribeToDocumentChanged(documentId: ID, listener: DocumentChangedListener): Unsubscribe

	//onViewPortResizeOrScroll(listener: Listener): Unsubscribe
	getDraggingResouce(): DraggingResourceState | undefined
	getDraggingNodes(): DraggingNodesState | undefined
	getCurrentSelectedIds(): ID[] | null
	getDocumentSelectedIds(documentId: ID): ID[] | null
	getNode(nodeId: ID): ITreeNode | null
	getNodeDocumentId(nodeId: ID): ID | undefined
	getDocumentRootNode(documentId: ID): ITreeNode | null
	getCurrentNode(): ITreeNode | null
	getCurrentTree(): ITreeNode | null
	getAllNodes(): ITreeNode[]
	getDragOver(): DragOverState
	getState(): State
	getSelectionMode(document: ID): DocumentSelectionMode
	//getDragging(): Dragging|null
}
