import { ILogicMetas } from "runner/reaction/interfaces/metas";
import { Action } from "../actions";

export function metasReducer(state:ILogicMetas, action: Action){
  return {
    ...state,
  }
}