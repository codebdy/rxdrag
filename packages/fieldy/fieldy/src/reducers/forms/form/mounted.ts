import { SET_FORM_FIELDS } from "../../../actions/registry";
import { IAction } from "../../../interfaces/fieldy";

export function mountedReduer(state: boolean|undefined, action:IAction<any>){
  switch (action.type) {
    case SET_FORM_FIELDS:
      return true
  }
  return state
}