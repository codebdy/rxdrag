import { SET_LANGUAGE } from "../actions/registry"
import { IAction } from "../interfaces/action"

export type State = string
export const DefaultLang = "zh-CN"

export function lang(state: State, action: IAction<string>): State {
  if (action.type === SET_LANGUAGE) {
    return action.payload || DefaultLang
  }
  return state
}
