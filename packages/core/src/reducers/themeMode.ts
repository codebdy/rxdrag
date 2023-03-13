import { SET_THEME_MODE } from "../actions/registry"
import { IAction, ThemeMode } from "../interfaces/action"

export type State = ThemeMode

export function themeMode(state: State, action: IAction<ThemeMode>): State {
  if (action.type === SET_THEME_MODE) {
    return action.payload || "light"
  }
  return state
}
