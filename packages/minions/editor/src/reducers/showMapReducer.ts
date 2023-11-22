import { Action, ActionType, ShowMapAction } from "../actions"

export function showMapReducer(state: boolean, action: Action): boolean {
  switch (action.type) {
    case ActionType.SHOW_MAP: {
      return (action as ShowMapAction).payload
    }
  }
  return state
}