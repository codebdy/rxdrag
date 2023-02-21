import { ILogicMetas } from "runner/minions/interfaces/metas";
import { Action, ActionType, AddEdgeAction, AddNodeAction, ChangeEdgeAction, ChangeNodeAction, RemoveNodeAction, SetMetasAction } from "../actions";

export function metasReducer(state: ILogicMetas, action: Action): ILogicMetas {
  switch (action.type) {
    case ActionType.SET_METAS: {
      return (action as SetMetasAction).payload
    }
    case ActionType.ADD_NODE: {
      return { ...state, reactions: [...state.reactions, (action as AddNodeAction).payload] }
    }
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAction
      return { ...state, reactions: [...state.reactions.filter(reaction => reaction.id !== changeNodeAction.payload.id), changeNodeAction.payload] }
    }
    case ActionType.ADD_EDGE: {
      return { ...state, invokes: [...state.invokes, (action as AddEdgeAction).payload] }
    }
    case ActionType.CHANGE_EDGE: {
      const changeEdgeAction = action as ChangeEdgeAction
      return { ...state, invokes: [...state.invokes.filter(invoke => invoke.id !== changeEdgeAction.payload.id), changeEdgeAction.payload] }
    }
    case ActionType.REMOVE_NODE: {
      const removeNodeAction = action as RemoveNodeAction
      return { ...state, reactions: state.reactions.filter(reaction => reaction.id !== removeNodeAction.payload) }
    }
    case ActionType.REMOVE_EDGE: {
      const removeNodeAction = action as RemoveNodeAction
      return { ...state, invokes: state.invokes.filter(invoke => invoke.id !== removeNodeAction.payload) }
    }
  }
  return state
}