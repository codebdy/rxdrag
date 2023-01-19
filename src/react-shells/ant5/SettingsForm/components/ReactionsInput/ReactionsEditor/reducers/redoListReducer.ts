import { Action } from "redux";
import { ILogicMetas } from "runner/reaction/metas";

export function redoListReducer(state:ILogicMetas[], action: Action){
  return {
    ...state,
  }
}