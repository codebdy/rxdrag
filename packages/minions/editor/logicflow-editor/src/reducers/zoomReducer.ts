import { Action, ActionType, SetZoomAction } from "../actions"

export function zoomReducer(state: number, action: Action): number {
  switch (action.type) {
    case ActionType.SET_ZOOM: {
      return (action as SetZoomAction).payload
    }
  }
  return state
}