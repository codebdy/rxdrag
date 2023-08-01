import { SetFormInitializedFlagPayload, SET_FORM_INITIALIZED_FLAG, SET_FORM_INITIAL_VALUE } from "../../../actions";
import { IAction } from "../../../interfaces/fieldy";

export function initializedReduer(state: boolean | undefined, action: IAction<unknown>) {
  switch (action.type) {
    case SET_FORM_INITIALIZED_FLAG:
      return (action.payload as SetFormInitializedFlagPayload).initialized

    case SET_FORM_INITIAL_VALUE:
      return true
  }
  return state
}