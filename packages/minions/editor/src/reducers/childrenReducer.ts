import { Action } from "redux"
import { ActionType, AddEdgeAction, ChangeEdgeAction, ChangeNodeAction, EmbedNodeAction, RemoveEdgeAction, RemoveNodeAction } from "../actions"
import { ILogicFlowMetas } from "@rxdrag/minions-schema"

export function childrenReducer(state: ILogicFlowMetas | undefined, action: Action): (ILogicFlowMetas | undefined) {
  switch (action.type) {
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAction
      return {
        nodes: state?.nodes?.map(node => node.id === changeNodeAction.payload.id ? changeNodeAction.payload : node) || [],
        lines: state?.lines || [],
      }
    }
    case ActionType.ADD_EDGE: {
      const addEdgeAction = action as AddEdgeAction;
      return {
        nodes: state?.nodes || [],
        lines: [...state?.lines || [], addEdgeAction.payload],
      }
    }

    case ActionType.CHANGE_EDGE: {
      const changeEdgeAction = action as ChangeEdgeAction;
      return {
        nodes: state?.nodes || [],
        lines: state?.lines.map(line => line.id === changeEdgeAction.payload.id ? changeEdgeAction.payload : line) || [],
      }
    }

    case ActionType.REMOVE_NODE: {
      const removeNodeAction = action as RemoveNodeAction
      return {
        nodes: state?.nodes?.filter(node => node.id !== removeNodeAction.payload) || [],
        lines: state?.lines || [],
      }
    }

    case ActionType.REMOVE_EDGE: {
      const removeEdgeAction = action as RemoveEdgeAction
      return {
        nodes: state?.nodes || [],
        lines: state?.lines.filter(line => line.id !== removeEdgeAction.payload) || [],
      }
    }

    case ActionType.EMBED_NODE: {
      const embedNodeAction = action as EmbedNodeAction
      return {
        nodes: [...state?.nodes?.filter(node=>node.id !== embedNodeAction.payload.id) || [], embedNodeAction.payload],
        lines: state?.lines || [],
      }
    }
  }
  return state
}