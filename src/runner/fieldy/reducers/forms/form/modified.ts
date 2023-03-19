import { IAction } from "core/interfaces/action";
import { SET_FIELD_MODIFY } from "runner/fieldy/actions";

export function modifiedReduer(state: boolean|undefined, action:IAction<any>){
  switch (action.type) {
    case SET_FIELD_MODIFY:
      return true
  }
  return state
}