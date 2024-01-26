import { invariant } from '@rxdrag/shared'
import type { Store } from 'redux'
import {
	ActiveDocumentListener,
	ActiveNodeListener,
	CanvasWidthLimitsListener,
	CanvasWidthListener,
	CurrentNodesChangeListener,
	DefulstViewType,
	DocumentViewListener,
	DraggingNodesListener,
	DraggingResourceListener,
	DragOverListener,
	HistoryListener,
	ID,
	IMonitor,
	ITreeNode,
	LangListener,
	Listener,
	NodeListener,
	SelectedChangeListener,
	DocumentSelectionMode,
	SelectionModeListener,
	SnapshotIndexListener,
	ThemeModeListener,
	Unsubscribe,
	DocumentTitleListener,
	DocumentChangedListener,
} from '../interfaces/index'
import type { State } from '../reducers/index'
import { DragOverState } from '../reducers/dragOver'
import { DraggingResourceState } from '../reducers/draggingResource'
import { DraggingNodesState } from '../reducers/draggingNodes'

/**
 * 为优化性能而生
 */
export class NodeChangeHandler {
	listeners: {
		[id in ID]: NodeListener[] | undefined
	} = {}

	handleNodeChange = (node: ITreeNode) => {
		for (const id of Object.keys(this.listeners)) {
			if (id === node.id) {
				const listeners = this.listeners[id]
				for (const listener of listeners || []) {
					listener(node)
				}
			}
		}
	}

	subscribeToNodeChanged = (id: ID, listener: NodeListener): Unsubscribe => {
		const unsubscribe = () => {
			this.removeListener(id, listener)
		}
		if (!this.listeners[id]) {
			this.listeners[id] = []
		}
		this.listeners[id]?.push(listener)
		return unsubscribe;
	}

	removeListener(id: ID, listener: NodeListener) {
		this.listeners[id] = this.listeners[id]?.filter(lis => lis !== listener)
	}
}

export class Monitor implements IMonitor {
	private store: Store<State>
	private nodeChangeHandler = new NodeChangeHandler()

	public constructor(store: Store<State>) {
		this.store = store
		this.doSubscribeToNodeChanged(this.nodeChangeHandler.handleNodeChange)
	}


	getAllNodes(): ITreeNode<unknown, unknown>[] {
		const state = this.getState()
		if (!state.activedDocumentId) {
			return []
		}
		const nodes: ITreeNode[] = []

		for (const key of Object.keys(state.nodesById)) {
			const node = state.nodesById[key]
			if (node.documentId === state.activedDocumentId) {
				nodes.push(node)
			}
		}

		return nodes;
	}

	getSelectionMode(document: string): DocumentSelectionMode {
		return this.store.getState().documentsById[document]?.selectionMode || DocumentSelectionMode.Normal
	}

	getCurrentNode(): ITreeNode | null {
		const state = this.getState()
		if (!state.activedDocumentId) {
			return null
		}

		const currentId = this.getSelectedNodeId(state?.selectedIds || [])
		return this.getNode(currentId)
	}

	getCurrentTree(): ITreeNode | null {
		const state = this.getState()
		if (!state.activedDocumentId) {
			return null
		}
		const documentState = state.documentsById[state.activedDocumentId]
		if (documentState?.rootId) {
			return this.getNode(documentState.rootId)
		}
		return null
	}

	getNodeDocumentId(nodeId: string): string | undefined {
		return this.getNode(nodeId)?.documentId
	}

	getNode(nodeId: string): ITreeNode | null {
		const nodes = this.store.getState().nodesById
		for (const ndId of Object.keys(nodes)) {
			if (ndId === nodeId) {
				return nodes[ndId]
			}
		}
		return null
	}

	getDocumentRootNode(documentId: ID): ITreeNode | null {
		const doc = this.getState().documentsById[documentId]
		return doc?.rootId ? this.getNode(doc?.rootId) : null
	}

	getState(): State {
		return this.store.getState()
	}

	subscribeToDraggingNodes(listener: DraggingNodesListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().draggingNodes
		const handleChange = () => {
			const nextState = this.store.getState().draggingNodes
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || null)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToDraggingResource(listener: DraggingResourceListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().draggingResource
		const handleChange = () => {
			const nextState = this.store.getState().draggingResource
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || null)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToDragOver(listener: DragOverListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().dragOver
		const handleChange = () => {
			const nextState = this.store.getState().dragOver
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || null)
		}

		return this.store.subscribe(handleChange)
	}

	getCurrentSelectedIds(): string[] | null {
		return this.getDocumentSelectedIds(this.getState().activedDocumentId || "")
	}

	getDocumentSelectedIds(documentId: ID): ID[] | null {
		const selectedIds = this.store.getState().selectedIds
		const nodes = this.store.getState().nodesById
		return selectedIds?.filter(id => nodes[id]?.documentId === documentId) || null
	}
	getDragOver(): DragOverState {
		return this.store.getState().dragOver || null
	}

	public subscribeToStateChange(listener: Listener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let prevStateId = this.store.getState().stateId
		const handleChange = () => {
			const state = this.store.getState()
			const currentStateId = state.stateId
			try {
				const canSkipListener =
					currentStateId === prevStateId //||
				// (currentStateId === prevStateId + 1 &&
				// 	!areDirty(state.dirtyHandlerIds, handlerIds))

				if (!canSkipListener) {
					listener()
				}
			} finally {
				prevStateId = currentStateId
			}
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToSelectChange(listener: SelectedChangeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		let previousState = this.store.getState().selectedIds
		const handleChange = () => {
			const nextState = this.store.getState().selectedIds
			if (nextState !== previousState) {
				listener(nextState)
			}
			previousState = nextState
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToCurrentNodeChanged(listener: CurrentNodesChangeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		const state = this.getState()
		let previousNodeId = this.getSelectedNodeId(state?.selectedIds || [])
		const handleChange = () => {
			const nextState = this.store.getState()
			const nodeId = this.getSelectedNodeId(nextState?.selectedIds || [])
			const node = this.getState().nodesById[nodeId] || null
			if (previousNodeId !== node?.id) {
				listener(node)
			}
			previousNodeId = node?.id
		}
		return this.store.subscribe(handleChange)
	}
	subscribeToHasNodeChanged(listener: Listener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		let previousState = this.store.getState().nodesById
		const handleChange = () => {
			const nextState = this.store.getState().nodesById
			if (nextState !== previousState) {
				listener()
			}
			previousState = nextState
		}
		return this.store.subscribe(handleChange)
	}

	//隔离NodesById的变化
	subscribeToNodeChanged(id: ID, listener: NodeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		return this.nodeChangeHandler.subscribeToNodeChanged(id, listener)
	}

	subscribeToLanguageChange(listener: LangListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().lang
		const handleChange = () => {
			const nextState = this.store.getState().lang
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToThemeModeChange(listener: ThemeModeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().themeMode
		const handleChange = () => {
			const nextState = this.store.getState().themeMode
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToActiveDocumentChanged(listener: ActiveDocumentListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().activedDocumentId
		const handleChange = () => {
			const nextState = this.store.getState().activedDocumentId
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToActiveChanged(listener: ActiveNodeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().activedNodeId
		const handleChange = () => {
			const nextState = this.store.getState().activedNodeId
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState)
		}

		return this.store.subscribe(handleChange)
	}
	subscribeToHistoryChange(documentId: string, listener: HistoryListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.history
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.history
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || [])
		}

		return this.store.subscribe(handleChange)
	}
	subscribeToSnapshotIndexChange(documentId: string, listener: SnapshotIndexListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.snapshotIndex
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.snapshotIndex
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || 0)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToCanvasWidthChange(documentId: string, listener: CanvasWidthListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.canvasWidth
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.canvasWidth
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || 0)
		}

		return this.store.subscribe(handleChange)
	}

	subscribeToCanvasWidthLimitsChange(documentId: string, listener: CanvasWidthLimitsListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.canvasWidthLimits
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.canvasWidthLimits
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || null)
		}
		return this.store.subscribe(handleChange)
	}
	subscribeToDocumentViewChange(documentId: string, listener: DocumentViewListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.viewType
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.viewType
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || DefulstViewType)
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToDocumentTitle(documentId: string, listener: DocumentTitleListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.title
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.title
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || DefulstViewType)
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToSelectionMode(documentId: string, listener: SelectionModeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.selectionMode
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.selectionMode
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || DocumentSelectionMode.Normal)
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToDocumentChanged(documentId: string, listener: DocumentChangedListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById[documentId]?.changed
		const handleChange = () => {
			const nextState = this.store.getState().documentsById[documentId]?.changed
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener(nextState || false)
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToDocumentsChange(listener: Listener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().documentsById
		const handleChange = () => {
			const nextState = this.store.getState().documentsById
			if (nextState === previousState) {
				return
			}
			previousState = nextState
			listener()
		}
		return this.store.subscribe(handleChange)
	}


	getDraggingResouce(): DraggingResourceState | undefined {
		const state = this.store.getState()
		return state.draggingResource
	}


	getDraggingNodes(): DraggingNodesState | undefined {
		const state = this.store.getState()
		return state.draggingNodes
	}


	private getSelectedNodeId(selectedIds?: ID[]) {
		return selectedIds?.length === 1 ? (selectedIds?.[0] || "") : ""
	}

	private doSubscribeToNodeChanged(listener: NodeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		let previousState = this.store.getState().nodesById
		const handleChange = () => {
			const nextState = this.store.getState().nodesById
			if (nextState !== previousState) {
				for (const nodeId of Object.keys(nextState)) {
					if (nextState[nodeId] !== previousState?.[nodeId]) {
						listener(nextState[nodeId])
					}
				}
			}
			previousState = nextState
		}
		return this.store.subscribe(handleChange)
	}
}
