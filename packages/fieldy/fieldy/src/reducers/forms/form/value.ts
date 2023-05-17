import { SetFormValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE } from "../../../actions";
import { IAction } from "../../../interfaces";

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