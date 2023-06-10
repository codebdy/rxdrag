import { FieldActionPayload, SET_FIELD_STATE, SetFieldStatePayload } from "../../../actions";
import { FieldState, IAction } from "../../../interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_STATE:
      return {
        ...state,
        ...(action.payload as SetFieldStatePayload).fieldState
      }
    default:
      return state
  }
}