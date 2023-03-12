import { invariant } from '../utils/util-invariant'
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
} from '../interfaces/index'
import type { State } from '../reducers/index'
import { DragOverState } from 'core/reducers/dragOver'

/**
 * 为优化性能而生
 */
export class NodeChangeHandler {
	listeners: {
		[id: ID]: NodeListener[] | undefined
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
	private nodechnageHandler = new NodeChangeHandler()

	public constructor(store: Store<State>) {
		this.store = store
		this.doSubscribeToNodeChanged(this.nodechnageHandler.handleNodeChange)
	}

	getSelectionMode(document: string): DocumentSelectionMode {
		return this.store.getState().documentsById[document]?.selectionMode || DocumentSelectionMode.Normal
	}

	getCurrentNode(): ITreeNode | null {
		const state = this.getState()
		if (!state.activedDocumentId) {
			return null
		}

		const currentId = this.getSeletedNodeId(state.documentsById[state.activedDocumentId]?.selectedIds || [])
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

	getDocumentRootNode(doumentId: ID): ITreeNode | null {
		const doc = this.getState().documentsById[doumentId]
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
		return this.store.getState().documentsById[documentId]?.selectedIds || null
	}
	getDrageOver(): DragOverState {
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
		let previousState = this.store.getState().documentsById
		const handleChange = () => {
			const nextState = this.store.getState().documentsById
			for (const key of Object.keys(nextState)) {
				if (nextState[key]?.selectedIds === previousState[key]?.selectedIds) {
					continue
				}
				listener(nextState[key]?.selectedIds || null, key)
			}
			previousState = nextState
		}
		return this.store.subscribe(handleChange)
	}

	subscribeToCurrentNodeChanged(listener: CurrentNodesChangeListener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')
		const activedDocumentId = this.getState().activedDocumentId
		const documentState = this.getState().documentsById[activedDocumentId || ""]
		let previousNodeId = this.getSeletedNodeId(documentState?.selectedIds || [])
		const handleChange = () => {
			const activedDocumentId = this.getState().activedDocumentId
			const nextState = this.store.getState().documentsById[activedDocumentId || ""]
			const nodeId = this.getSeletedNodeId(nextState?.selectedIds || [])
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
		return this.nodechnageHandler.subscribeToNodeChanged(id, listener)
	}

	subscribeToLangeChange(listener: LangListener): Unsubscribe {
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

	isDragging(): boolean {
		const state = this.store.getState()

		return !!state.draggingResource || !!state.draggingNodes
	}

	private getSeletedNodeId(selectedIds?: ID[]) {
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
