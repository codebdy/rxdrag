import { ADD_NODES, CHANGE_NODE_META, DELETE_NODES, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT } from "core/actions/registry"
import { ID } from "core/interfaces"
import { invariant } from "core/utils/util-invariant"
import { IAction } from "fieldy/interfaces"
import { IDocumentAction, NodeRelativePosition, ITreeNode } from "../interfaces/document"
import { DocumentInitPayload, AddNodesPayload, DocumentActionPayload, MoveNodesPayload, DeleteNodesPayload, ChangeMetaPayloads, RecoverSnapshotPayload } from "../interfaces/payloads"

export type NodesById = {
	[id: ID]: ITreeNode
}
export type State = NodesById

export function nodesById(
	state: State = {},
	action: IAction<DocumentActionPayload | ChangeMetaPayloads>,
): State {
	const { payload } = action
	switch (action.type) {
		case INITIALIZE:
			return (payload as DocumentInitPayload)?.nodesById || {}
		case ADD_NODES:
			return addNods(state, action as IDocumentAction<DocumentActionPayload>)
		case MOVE_NODES:
			return moveNodes(state, action as IDocumentAction<DocumentActionPayload>)
		case DELETE_NODES:
			return remove(state, (payload as DeleteNodesPayload).sourceIds)
		case CHANGE_NODE_META:
			return changeNodeMeta(state, payload as ChangeMetaPayloads)
		case RECOVER_SNAPSHOT:
			return revoverSnapshot(state, action as IDocumentAction<RecoverSnapshotPayload>)
		default:
			return state
	}
}

function addNods(state: State = {},
	action: IDocumentAction<DocumentActionPayload>) {
	const { payload } = action
	const addPlayload = payload as AddNodesPayload
	const pos = addPlayload.pos
	const newState = Object.assign({}, state, addPlayload.nodes.nodesById)
	const sourceIds = addPlayload.nodes.rootNodes.map(node => node.id)
	if (pos === NodeRelativePosition.InTop || pos === NodeRelativePosition.InBottom) {
		return addIn(newState, sourceIds, addPlayload.targetId, pos)
	} else if (pos === NodeRelativePosition.Before || pos === NodeRelativePosition.After) {
		return addSiblings(newState, sourceIds, addPlayload.targetId, pos)
	}

	return newState
}

function moveNodes(state: State = {},
	action: IDocumentAction<DocumentActionPayload>) {
	const { payload } = action
	const movePlayload = payload as MoveNodesPayload
	const movePos = movePlayload.pos
	const newState = Object.assign({}, state)
	for (const targetId of movePlayload.sourceIds) {
		const targetNode = state[targetId]
		invariant(targetNode, "can not find target node")
		const parentNode = state[targetNode.parentId || ""]
		//从父节点中删除
		newState[targetNode.parentId || ""] = Object.assign({}, parentNode, { children: parentNode?.children?.filter(id => id !== targetId) })

		//再加入
		if (movePos === NodeRelativePosition.InTop || movePos === NodeRelativePosition.InBottom) {
			return addIn(newState, movePlayload.sourceIds, movePlayload.targetId, movePos)
		} else if (movePos === NodeRelativePosition.Before || movePos === NodeRelativePosition.After) {
			return addSiblings(newState, movePlayload.sourceIds, movePlayload.targetId, movePos)
		}
	}

	return newState
}

function addIn(state: NodesById, sourceIds: ID[], targetId: ID, pos: NodeRelativePosition) {
	const targetNode = state[targetId]
	invariant(targetNode, "can not find target node")
	const newChildren = pos === NodeRelativePosition.InBottom
		? [...sourceIds, ...targetNode.children]
		: [...targetNode.children, ...sourceIds]
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
	const newSibings = parentNode.children.slice(0, targetIndex)
		.concat(sourceIds)
		.concat(parentNode.children.slice(targetIndex))
	let newState = Object.assign({}, state, {
		[parentNode.id]: {
			...parentNode,
			children: newSibings
		}
	})

	for (const id of sourceIds) {
		newState = { ...newState, [id]: { ...newState[id], parentId: targetNode.parentId } }
	}

	return newState
}

function remove(state: NodesById, targetIds: ID[]): NodesById {
	throw new Error("remove method not implemented")
	//return state
}

function changeNodeMeta(state: NodesById, payload: ChangeMetaPayloads): NodesById {
	const node = state[payload.id]
	return {
		...state,
		[payload.id]: { ...node, meta: payload.meta },
	}
}

function revoverSnapshot(state: NodesById, action: IDocumentAction<RecoverSnapshotPayload>): NodesById {
	const newState:NodesById = Object.assign({}, action.payload?.snapshot.nodes||{})
	for (const key of Object.keys(state)) {
		const node = state[key]
		if (node.documentId !== action.payload?.documentId) {
			newState[key] = node
		}
	}
	return newState
}


