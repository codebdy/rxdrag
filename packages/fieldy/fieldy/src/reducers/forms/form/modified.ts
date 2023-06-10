import { SET_FIELD_VALUE } from "../../../actions";
import { IAction } from "../../../interfaces";

export function modifiedReduer(state: boolean|undefined, action:IAction<unknown>){
  switch (action.type) {
    case SET_FIELD_VALUE:
      return true
  }
  return state
}