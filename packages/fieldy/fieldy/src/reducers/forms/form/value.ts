import { SetFormValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE, SET_FORM_DEFAULT_VALUE } from "../../../actions";
import { FieldsState, FormValue, IAction } from "../../../interfaces";
import { mergeDefaultValueToValue } from "./helpers";

export function valueReduer(state: FormValue | undefined, action: IAction<unknown>, fields: FieldsState) {
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
    case SET_FORM_VALUE: {
      return (action.payload as SetFormValuePayload).value
    }

    case SET_FORM_DEFAULT_VALUE: {
      //合格并value
      return mergeDefaultValueToValue((action.payload as SetFormValuePayload).value, state, fields);
    }

  }
  return state
}
