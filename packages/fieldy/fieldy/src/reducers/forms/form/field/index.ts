import { FieldActionPayload, SET_FIELD_MODIFY, SetFieldValuePayload, SET_FIELD_INITAL_VALUE, SET_FIELD_VALUE, SET_FIELD_STATE, SetFieldStatePayload } from "../../../../actions";
import { FieldState, IAction } from "../../../../interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  const setFieldInitialValuePayload = action.payload as SetFieldValuePayload
  switch (action.type) {
    case SET_FIELD_MODIFY:
      return {
        ...state,
        modified: true,
      }
    case SET_FIELD_VALUE:
      return {
        ...state,
        value: (action.payload as SetFieldValuePayload).value
      }
    case SET_FIELD_STATE:
      return {
        ...state,
        ...(action.payload as SetFieldStatePayload).fieldState
      }
    case SET_FIELD_INITAL_VALUE:
      return {
        ...state,
        initialValue: setFieldInitialValuePayload.value,
        value: setFieldInitialValuePayload.value,
      }
    default:
      return state
  }
}