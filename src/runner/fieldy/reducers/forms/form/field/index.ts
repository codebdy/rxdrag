import { FieldActionPayload, SET_FIELD_MODIFY, SetFieldValuePayload, SET_FIELD_INITAL_VALUE, SET_FIELD_VALUE } from "runner/fieldy/actions";
import { FieldState, IAction } from "runner/fieldy/interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
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
    case SET_FIELD_INITAL_VALUE:
      const setFieldInitialValuePayload = action.payload as SetFieldValuePayload
      return {
        ...state,
        initialValue: setFieldInitialValuePayload.value,
        value: setFieldInitialValuePayload.value,
      }
    default:
      return state
  }
}