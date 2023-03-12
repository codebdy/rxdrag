import { IAction } from "core/interfaces/action";
import { SET_FORM_INITIAL_VALUE, SetFormValuePayload } from "runner/fieldy/actions";

export function initialValueReduer(state: boolean|undefined, action:IAction<any>){
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
  }
  return state
}