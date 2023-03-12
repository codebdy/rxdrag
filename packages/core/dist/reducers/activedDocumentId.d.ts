import { ID } from "interfaces";
import { IAction } from "interfaces/action";
export type State = ID | null;
export declare function activedDocumentId(state: State | undefined, action: IAction<ID | null>): State;
