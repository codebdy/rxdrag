import { SetFormValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE, REMOVE_FORM_FIELD, SetFieldValuePayload, SET_FIELD_VALUE, SET_FIELD_INITIAL_VALUE, SET_FIELD_DEFAULT_VALUE, INPUT_FIELD_VALUE } from "../../../actions";
import { FormState, FormValue, IAction } from "../../../interfaces/fieldy";
import { FormHelper } from "./helpers";

export function valueReduer(state: FormValue | undefined, action: IAction<unknown>, formState: FormState) {
  const setFieldValuePayload = action.payload as SetFieldValuePayload
  const setFormValuePayload = action.payload as SetFormValuePayload
  const formHelper = new FormHelper(formState)
  switch (action.type) {
    case SET_FORM_INITIAL_VALUE:
      return (action.payload as SetFormValuePayload).value
    case SET_FORM_VALUE: {
      return (setFormValuePayload)?.value === undefined ? state : (setFormValuePayload).value
    }
    // case SET_FORM_DEFAULT_VALUE: {
    //   //合格并value
    //   return formHelper.mergeDefaultValueToValue((action.payload as SetFormValuePayload).value);
    // }
    case REMOVE_FORM_FIELD:
      //删除相关value
      return formHelper.removeValueByPath(setFieldValuePayload.path);
    case SET_FIELD_VALUE:
    case INPUT_FIELD_VALUE:
      return formHelper.setValueByPath(setFieldValuePayload.path, setFieldValuePayload.value);
    case SET_FIELD_INITIAL_VALUE:
      return formHelper.setValueByPath(setFieldValuePayload.path, setFieldValuePayload.value);
    case SET_FIELD_DEFAULT_VALUE:
      if (formHelper.getValueByPath(setFieldValuePayload.path) === undefined) {
        return formHelper.setValueByPath(setFieldValuePayload.path, setFieldValuePayload.value);
      }
  }
  return state
}
