import { SET_FIELD_DEFAULT_VALUE, SET_FORM_INITIAL_VALUE, SetFieldValuePayload, SetFormValuePayload } from "../../../actions";
import { FormValue, IAction } from "../../../interfaces";
import { setValueByPath } from "./helpers";

export function initialValueReduer(state: FormValue | undefined, action: IAction<unknown>) {
  const setFieldValuePayload = action.payload as SetFieldValuePayload
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
    case SET_FIELD_DEFAULT_VALUE:
      return setValueByPath(state, setFieldValuePayload.path, setFieldValuePayload.value);
  }
  return state
}