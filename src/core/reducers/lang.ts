import { SET_LANGUAGE } from "core/actions/registry"
import { IAction } from "core/interfaces/action"

export type State = string
export const DefualtLang = "zh-CN"

export function lang(state: State, action: IAction<string>): State {
  if (action.type === SET_LANGUAGE) {
    return action.payload || DefualtLang
  }
  return state
}
