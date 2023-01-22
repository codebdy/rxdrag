import { ILogicMetas } from "runner/reaction/interfaces/metas";
import { Action, ActionType, AddNodeAcion, ChangeNodeAcion } from "../actions";

export function metasReducer(state: ILogicMetas, action: Action): ILogicMetas {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      return { ...state, reactions: [...state.reactions, (action as AddNodeAcion).payload] }
    }
    case ActionType.CHANGE_NODE: {
      const changeNodeAction = action as ChangeNodeAcion
      return { ...state, reactions: [...state.reactions.filter(reaction => reaction.id !== changeNodeAction.payload.id), changeNodeAction.payload] }
    }
  }
  return state
}