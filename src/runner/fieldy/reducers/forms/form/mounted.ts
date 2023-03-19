import { IAction } from "core/interfaces/action";
import { SET_FORM_FIELDS } from "runner/fieldy/actions/registry";

export function mountedReduer(state: boolean|undefined, action:IAction<any>){
  switch (action.type) {
    case SET_FORM_FIELDS:
      return true
  }
  return state
}