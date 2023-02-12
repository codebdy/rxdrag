import { FieldActionPayload, SetFieldValuePayload, SET_FIELD_INITAL_VALUE, SET_FIELD_VALUE } from "runner/fieldy/actions";
import { FieldState, IAction } from "runner/fieldy/interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_VALUE:
      const setFieldValuePayload = action.payload as SetFieldValuePayload
      const newData = {
        ...state,
        value: setFieldValuePayload.value
      }
      return newData
    case SET_FIELD_INITAL_VALUE:
      const setFieldInitialValuePayload = action.payload as SetFieldValuePayload
      console.log("哈哈哈 fieldReduce", setFieldInitialValuePayload)
      return {
        ...state,
        initialValue: setFieldInitialValuePayload.value,
        value: setFieldInitialValuePayload.value,
      }
    default:
      return state
  }
}