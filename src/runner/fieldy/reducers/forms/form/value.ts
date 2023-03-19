import { IAction } from "core/interfaces/action";
import { SetFormValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE } from "runner/fieldy/actions";

export function valueReduer(state: any, action: IAction<any>) {
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
    case SET_FORM_VALUE: {
      return (action.payload as SetFormValuePayload).value
    }
  }
  return state
}