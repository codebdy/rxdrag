import { ILogicMetas } from "runner/reaction/interfaces/metas";
import { Action, ActionType, AddEdgeAction, AddNodeAction, ChangeNodeAction } from "../actions";

export function metasReducer(state: ILogicMetas, action: Action): ILogicMetas {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      return { ...state, reactions: [...state.reactions, (action as AddNodeAction).payload] }
    }
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAction
      return { ...state, reactions: [...state.reactions.filter(reaction => reaction.id !== changeNodeAction.payload.id), changeNodeAction.payload] }
    }
    case ActionType.ADD_EDGE:{
      return { ...state, invakes: [...state.invakes, (action as AddEdgeAction).payload] }
    }
  }
  return state
}