import { IAction } from "core/interfaces/action";
import { INPUT_FIELD_VALUE } from "runner/fieldy/actions";

export function modifiedReduer(state: boolean|undefined, action:IAction<any>){
  switch (action.type) {
    case INPUT_FIELD_VALUE:
      return true
  }
  return state
}