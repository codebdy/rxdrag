import { IAction, } from "core/interfaces/action";
import { DocumentSelectionMode, SelectionModePayload } from "core/interfaces";
import { SET_SELECTION_MODE } from "core/actions/registry";

export type SelectionModeState = DocumentSelectionMode

export function selectionMode(
  state: SelectionModeState = DocumentSelectionMode.Normal,
  action: IAction<SelectionModePayload>,
): SelectionModeState {
  switch (action.type) {
    case SET_SELECTION_MODE:
      return action.payload?.mode || DocumentSelectionMode.Normal
    default:
      return state
  }
}
