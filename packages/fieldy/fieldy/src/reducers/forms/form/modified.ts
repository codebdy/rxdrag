import { INPUT_FIELD_VALUE, SET_FORM_INITIAL_VALUE } from "../../../actions";
import { IAction } from "../../../interfaces/fieldy";

export function modifiedReduer(state: boolean | undefined, action: IAction<unknown>) {
  switch (action.type) {
    case INPUT_FIELD_VALUE:
      return true
    case SET_FORM_INITIAL_VALUE:
      return false
  }
  return state
}