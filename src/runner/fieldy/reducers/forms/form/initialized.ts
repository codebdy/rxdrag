import { IAction } from "core/interfaces/action";
import { SetFormInitializedFlagPayload, SET_FORM_INITIALZED_FLAG, SET_FORM_INITIAL_VALUE } from "runner/fieldy/actions";

export function initializedReduer(state: boolean | undefined, action: IAction<any>) {
  switch (action.type) {
    case SET_FORM_INITIALZED_FLAG:
      return (action.payload as SetFormInitializedFlagPayload).initialized

    case SET_FORM_INITIAL_VALUE:
      return true
  }
  return state
}