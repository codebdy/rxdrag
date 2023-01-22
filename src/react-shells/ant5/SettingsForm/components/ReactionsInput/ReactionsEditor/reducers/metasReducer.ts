import { ILogicMetas } from "runner/reaction/interfaces/metas";
import { Action, ActionType, AddNodeAcion } from "../actions";

export function metasReducer(state: ILogicMetas, action: Action): ILogicMetas {
  switch (action.type) {
    case ActionType.ADD_NODE: {
      return { ...state, reactions: [...state.reactions, (action as AddNodeAcion).payload] }
    }
  }
  return state
}