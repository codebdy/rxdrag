import { IAction } from "interfaces/action";
import { DocumentSelectionMode, SelectionModePayload } from "interfaces";
export type SelectionModeState = DocumentSelectionMode;
export declare function selectionMode(state: DocumentSelectionMode | undefined, action: IAction<SelectionModePayload>): SelectionModeState;
