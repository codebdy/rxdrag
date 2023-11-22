/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADD_NODES, CHANGE_NODE_META, DELETE_NODES, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_DOCUMENT, REMOVE_SLOT } from "../actions/registry"
import { ID } from "../interfaces"
import { IAction } from "../interfaces/action"
import { invariant } from "@rxdrag/shared"
import { IDocumentAction, NodeRelativePosition, NodesById } from "../interfaces/document"
import { DocumentInitPayload, AddNodesPayload, DocumentActionPayload, MoveNodesPayload, DeleteNodesPayload, ChangeMetaPayloads, RecoverSnapshotPayload, RemoveSlotPayload } from "../interfaces/payloads"


export type State = NodesById

export function nodesById(
	state: State = {},
	action: IAction<DocumentActionPayload | ChangeMetaPayloads>,
): State {
	const { payload } = action
	const newState: State = {}
	switch (action.type) {
		case INITIALIZE:
			return { ...state, ...(payload as DocumentInitPayload)?.nodesById || {} }
		case ADD_NODES:
			return addNods(state, action as IDocumentAction<DocumentActionPayload>)
		case MOVE_NODES:
			return moveNodes(state, action as IDocumentAction<DocumentActionPayload>)
		case DELETE_NODES:
			return remove(state, (payload as DeleteNodesPayload).sourceIds)
		case CHANGE_NODE_META:
			return changeNodeMeta(state, payload as ChangeMetaPayloads)
		case RECOVER_SNAPSHOT:
			return recoverSnapshot(state, action as IDocumentAction<RecoverSnapshotPayload>)
		case REMOVE_SLOT:
			return removeSlot(state, action as IDocumentAction<RemoveSlotPayload>)

		case REMOVE_DOCUMENT:
			for (const key of Object.keys(state)) {
				if (state[key]?.documentId !== (action as IDocumentAction<DocumentActionPayload>).payload?.documentId) {
					newState[key] = state[key]
				}
			}
			return newState
		default:
			return state
	}
}

function addNods(state: State = {},
	action: IDocumentAction<DocumentActionPayload>) {
	const { payload } = action
	const addPayload = payload as AddNodesPayload
	const { pos, slot } = addPayload
	const newState = Object.assign({}, state, addPayload.nodes.nodesById)
	const sourceIds = addPayload.nodes.rootNodes.map(node => node.id)
	if (pos === NodeRelativePosition.InTop || pos === NodeRelativePosition.InBottom) {
		return addIn(newState, sourceIds, addPayload.targetId, pos)
	} else if (pos === NodeRelativePosition.Before || pos === NodeRelativePosition.After) {
		return addSiblings(newState, sourceIds, addPayload.targetId, pos)
	} else if (slot) {
		return addSlot(newState, addPayload.targetId, slot, sourceIds[0])
	}
	return newState
}

function moveNodes(state: State = {},
	action: IDocumentAction<DocumentActionPayload>) {
	const { payload } = action
	const movePayload = payload as MoveNodesPayload
	const movePos = movePayload.pos
	const newState = Object.assign({}, state)
	for (const targetId of movePayload.sourceIds) {
		const targetNode = state[targetId]
		invariant(targetNode, "can not find target node")
		const parentNode = state[targetNode.parentId || ""]
		//从父节点中删除
		newState[targetNode.parentId || ""] = Object.assign({}, parentNode, { children: parentNode?.children?.filter(id => id !== targetId) })

		//再加入
		if (movePos === NodeRelativePosition.InTop || movePos === NodeRelativePosition.InBottom) {
			return addIn(newState, movePayload.sourceIds, movePayload.targetId, movePos)
		} else if (movePos === NodeRelativePosition.Before || movePos === NodeRelativePosition.After) {
			return addSiblings(newState, movePayload.sourceIds, movePayload.targetId, movePos)
		}
	}

	return newState
}

function addIn(state: NodesById, sourceIds: ID[], targetId: ID, pos: NodeRelativePosition) {
	const targetNode = state[targetId]
	invariant(targetNode, "can not find target node")
	const newChildren = pos === NodeRelativePosition.InBottom
		? [...targetNode.children, ...sourceIds]
		: [...sourceIds, ...targetNode.children]
	let newState = Object.assign({}, state, {
		[targetNode.id]: {
			...targetNode,
			children: newChildren
		}
	})

	for (const id of sourceIds) {
		newState = { ...newState, [id]: { ...newState[id], parentId: targetId } }
	}

	return newState
}

//未调试
function addSiblings(state: NodesById, sourceIds: ID[], targetId: ID, pos: NodeRelativePosition) {
	const targetNode = state[targetId]
	invariant(targetNode, "can not find target node")
	const parentNode = state[targetNode.parentId || ""]
	invariant(parentNode, "can not find parent on target node")
	const targetIndex = parentNode.children.indexOf(targetId) + (pos === NodeRelativePosition.After ? 1 : 0)
	const newSiblings = parentNode.children.slice(0, targetIndex)
		.concat(sourceIds)
		.concat(parentNode.children.slice(targetIndex))
	let newState = Object.assign({}, state, {
		[parentNode.id]: {
			...parentNode,
			children: newSiblings
		}
	})

	for (const id of sourceIds) {
		newState = { ...newState, [id]: { ...newState[id], parentId: targetNode.parentId } }
	}

	return newState
}

function remove(state: NodesById, targetIds: ID[]): NodesById {
	const newState: NodesById = {}
	for (const key of Object.keys(state)) {
		if (!targetIds.find(id => id === key)) {
			newState[key] = state[key]
			if (newState[key].children?.find(childId => targetIds.find(id => id === childId))) {
				newState[key] = {
					...newState[key],
					children: newState[key].children.filter(childId => !targetIds.find(id => id === childId))
				}
			}
			for (const slotName of Object.keys(newState[key].slots || {})) {
				const slotId = newState[key].slots?.[slotName] || ""
				if (targetIds.find(id => id === slotId)) {
					delete newState[key].slots?.[slotName]
				}
			}
		}
	}
	return newState
}

function changeNodeMeta(state: NodesById, payload: ChangeMetaPayloads): NodesById {
	const node = state[payload.id]
	return {
		...state,
		[payload.id]: { ...node, meta: payload.meta },
	}
}

function recoverSnapshot(state: NodesById, action: IDocumentAction<RecoverSnapshotPayload>): NodesById {
	const newState: NodesById = Object.assign({}, action.payload?.snapshot.nodes || {})
	for (const key of Object.keys(state)) {
		const node = state[key]
		if (node.documentId !== action.payload?.documentId) {
			newState[key] = node
		}
	}
	return newState
}

function removeSlot(state: NodesById, action: IDocumentAction<RemoveSlotPayload>): NodesById {
	const nodeId = action.payload?.nodeId
	const newState: NodesById = { ...state }
	if (action.payload && nodeId) {
		const node = state[nodeId]
		const newSlots: any = {}
		for (const slotName of Object.keys(node.slots || {})) {
			if (slotName !== action.payload.slotName) {
				newSlots[slotName] = node.slots?.[slotName]
			}
		}
		if (node) {
			newState[nodeId] = {
				...node,
				slots: newSlots
			}
		}

		for (const id of Object.keys(newState)) {
			if (id === node.slots?.[action.payload?.slotName]) {
				delete newState[id]
			}
		}

		return newState
	}

	return state
}

function addSlot(state: NodesById, targetId: ID, slotName: string, slotId: ID): NodesById {
	const newState: NodesById = { ...state }
	if (targetId) {
		const node = state[targetId]
		const newSlots: any = { ...node.slots, [slotName]: slotId }
		newState[targetId] = { ...node, slots: newSlots }
		if (slotId) {
			newState[slotId] = { ...newState[slotId], parentId: targetId }
		}
		return newState
	}
	return state
}
