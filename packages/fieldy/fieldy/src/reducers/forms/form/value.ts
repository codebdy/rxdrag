import { SetFormValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE, SET_FORM_DEFAULT_VALUE, REMOVE_FORM_FIELDS, SetFieldValuePayload, SET_FIELD_VALUE, SET_FIELD_INITAL_VALUE, SET_FIELD_DEFAULT_VALUE } from "../../../actions";
import { FieldsState, FormValue, IAction } from "../../../interfaces";
import { getValueByPath, mergeDefaultValueToValue, removeValueByPath, setValueByPath } from "./helpers";

export function valueReduer(state: FormValue | undefined, action: IAction<unknown>, fields: FieldsState) {
  const setFieldValuePayload = action.payload as SetFieldValuePayload
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
    case REMOVE_FORM_FIELDS:
      //删除相关value
      return removeValueByPath(state, setFieldValuePayload.path);
    case SET_FIELD_VALUE:
      return setValueByPath(state, setFieldValuePayload.path, setFieldValuePayload.value);
    case SET_FIELD_INITAL_VALUE:
      return setValueByPath(state, setFieldValuePayload.path, setFieldValuePayload.value);
    case SET_FIELD_DEFAULT_VALUE:
      if (getValueByPath(state, setFieldValuePayload.path) === undefined) {
        return setValueByPath(state, setFieldValuePayload.path, setFieldValuePayload.value);
      }
      return state;
  }
  return state
}
