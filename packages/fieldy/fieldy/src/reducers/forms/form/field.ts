import { CLEAR_FIELD_ERRORS, FieldActionPayload, INPUT_FIELD_VALUE, SET_FIELD_INITIAL_VALUE, SET_FIELD_STATE, SetFieldStatePayload } from "../../../actions";
import { FieldState, IAction } from "../../../interfaces/fieldy";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_STATE:
      return {
        ...state,
        ...(action.payload as SetFieldStatePayload).fieldState
      }
    case INPUT_FIELD_VALUE:
      return {
        ...state,
        modified: true
      }
    case SET_FIELD_INITIAL_VALUE:
      return {
        ...state,
        modified: false
      }
    case CLEAR_FIELD_ERRORS:
      return {
        ...state,
        errors: []
      }

    default:
      return state
  }
}