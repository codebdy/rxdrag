import { FieldActionPayload, SetFieldValuePayload, SET_FIELD_VALUE } from "runner/fieldy/actions";
import { FieldState, IAction } from "runner/fieldy/interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_VALUE:
      const setFieldValuePayload = action.payload as SetFieldValuePayload
      const newData = {
        ...state,
        value: setFieldValuePayload.value
      }
      console.log("哈哈 set field value", newData)
      return newData
    default:
      return state
  }
}