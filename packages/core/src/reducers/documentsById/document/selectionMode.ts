import { IAction, } from "../../../interfaces/action";
import { DocumentSelectionMode, SelectionModePayload } from "../../../interfaces";
import { SET_SELECTION_MODE } from "../../../actions/registry";

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
