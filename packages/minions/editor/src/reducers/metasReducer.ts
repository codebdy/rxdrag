import { ActionType, SetMetasAction, AddNodeAction, ChangeNodeAction, AddEdgeAction, ChangeEdgeAction, RemoveNodeAction, Action, RemoveEdgeAction, EmbedNodeAction } from "../actions";
import { IActivityNode, ILogicMetas } from "../interfaces";
import { childrenReducer } from "./childrenReducer";

export function metasReducer(state: ILogicMetas, action: Action): ILogicMetas {
  const parentId = (action as AddEdgeAction | ChangeEdgeAction).parentId
  switch (action.type) {
    case ActionType.SET_METAS: {
      return (action as SetMetasAction).payload
    }
    case ActionType.ADD_NODE: {
      return { ...state, nodes: [...state.nodes, (action as AddNodeAction).payload] }
    }
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAction
      if (changeNodeAction.payload.parentId) {
        return { ...state, nodes: state.nodes.map(node => node.id === changeNodeAction.payload.parentId ? { ...node, children: childrenReducer(node.children, action) } : node) }
      }
      return { ...state, nodes: [...state.nodes.filter(node => node.id !== changeNodeAction.payload.id), changeNodeAction.payload] }
    }
    case ActionType.ADD_EDGE: {
      if (parentId) {
        return { ...state, nodes: state.nodes.map(node => node.id === parentId ? { ...node, children: childrenReducer(node.children, action) } : node) }
      }
      return { ...state, lines: [...state.lines, (action as AddEdgeAction).payload] }
    }
    case ActionType.CHANGE_EDGE: {
      if (parentId) {
        return { ...state, nodes: state.nodes.map(node => node.id === parentId ? { ...node, children: childrenReducer(node.children, action) } : node) }
      }
      const changeEdgeAction = action as ChangeEdgeAction
      return { ...state, lines: [...state.lines.filter(line => line.id !== changeEdgeAction.payload.id), changeEdgeAction.payload] }
    }
    case ActionType.REMOVE_NODE: {
      const removeNodeAction = action as RemoveNodeAction
      const parentId = getNodeParentId(removeNodeAction.payload, state.nodes)
      if (parentId) {
        return { ...state, nodes: state.nodes.map(node => node.id === parentId ? { ...node, children: childrenReducer(node.children, action) } : node) }
      }
      return { ...state, nodes: state.nodes.filter(nd => nd.id !== removeNodeAction.payload) }
    }
    case ActionType.REMOVE_EDGE: {
      const removeEdgeAction = action as RemoveEdgeAction
      const parentId = getLineParentId(removeEdgeAction.payload, state.nodes)
      if (parentId) {
        return { ...state, nodes: state.nodes.map(node => node.id === parentId ? { ...node, children: childrenReducer(node.children, action) } : node) }
      }
      return { ...state, lines: state.lines.filter(line => line.id !== removeEdgeAction.payload) }
    }

    case ActionType.EMBED_NODE: {
      const embedNodeAction = action as EmbedNodeAction
      const newParentNode = state.nodes.find(node => node.id === embedNodeAction.parentId)

      if (newParentNode) {
        const newNodes = [...state.nodes.filter(nd => nd.id !== embedNodeAction.payload.id && nd.id !== embedNodeAction.parentId), { ...newParentNode, children: childrenReducer(newParentNode.children, action) }]
        return { ...state, nodes: newNodes }
      } else {
        console.error("Parent node not found when embed node")
      }
    }
  }
  return state
}

function getNodeParentId(nodeId: string, nodes: IActivityNode[]) {
  for (const node of nodes) {
    for (const child of node.children?.nodes || []) {
      if (child.id === nodeId) {
        return node.id
      }
    }
  }
}

function getLineParentId(lineId: string, nodes: IActivityNode[]) {
  for (const node of nodes) {
    for (const child of node.children?.lines || []) {
      if (child.id === lineId) {
        return node.id
      }
    }
  }
}