import { Action, ActionType, AddEdgeAction, AddNodeAction, ChangeEdgeAction, ChangeNodeAction, RemoveNodeAction, SetMetasAction } from "../actions";
import { ILogicMetas } from "../interfaces";

export function metasReducer(state: ILogicMetas, action: Action):ILogicMetas {
  switch (action.type) {
    case ActionType.SET_METAS: {
      return (action as SetMetasAction).payload
    }
    case ActionType.ADD_NODE: {
      return { ...state, nodes: [...state.nodes, (action as AddNodeAction).payload] }
    }
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAction
      return { ...state, nodes: [...state.nodes.filter(node => node.id !== changeNodeAction.payload.id), changeNodeAction.payload] }
    }
    case ActionType.ADD_EDGE: {
      return { ...state, lines: [...state.lines, (action as AddEdgeAction).payload] }
    }
    case ActionType.CHANGE_EDGE: {
      const changeEdgeAction = action as ChangeEdgeAction
      return { ...state, lines: [...state.lines.filter(line => line.id !== changeEdgeAction.payload.id), changeEdgeAction.payload] }
    }
    case ActionType.REMOVE_NODE: {
      const removeNodeAction = action as RemoveNodeAction
      return { ...state, nodes: state.nodes.filter(nd => nd.id !== removeNodeAction.payload) }
    }
    case ActionType.REMOVE_EDGE: {
      const removeNodeAction = action as RemoveNodeAction
      return { ...state, lines: state.lines.filter(line => line.id !== removeNodeAction.payload) }
    }
  }
  return state
}