import { SET_FIELD_DEFAULT_VALUE, SET_FORM_INITIAL_VALUE, SetFieldValuePayload, SetFormValuePayload } from "../../../actions";
import { FormState, FormValue, IAction } from "../../../interfaces/fieldy";
import { FormHelper } from "./helpers";

export function initialValueReduer(state: FormValue | undefined, action: IAction<unknown>, formState: FormState) {
  const setFieldValuePayload = action.payload as SetFieldValuePayload
  const formHelper = new FormHelper(formState)
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
    case SET_FIELD_DEFAULT_VALUE:
      return formHelper.doSetValueByPath(state, setFieldValuePayload.path, setFieldValuePayload.value);
  }
  return state
}