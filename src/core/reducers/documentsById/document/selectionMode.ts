import { IAction, } from "core/interfaces/action";
import { SelectionMode } from "core/interfaces";
import { SET_SELECTION_MODE } from "core/actions/registry";

export type SelectionModeState = SelectionMode

export function selectionMode(
  state: SelectionModeState = SelectionMode.Normal,
  action: IAction<SelectionMode>,
): SelectionModeState {
  switch (action.type) {
    case SET_SELECTION_MODE:
      return action.payload || SelectionMode.Normal
    default:
      return state
  }
}
