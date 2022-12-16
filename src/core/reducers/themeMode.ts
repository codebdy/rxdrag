import { SET_THEME_MODE } from "core/actions/registry"
import { IAction, ThemeMode } from "core/interfaces/action"

export type State = ThemeMode

export function themeMode(state: State, action: IAction<ThemeMode>): State {
  if (action.type === SET_THEME_MODE) {
    return action.payload || "light"
  }
  return state
}
