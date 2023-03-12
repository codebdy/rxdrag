import { ID } from "interfaces";
import { IAction } from "interfaces/action";
export type State = ID | undefined | null;
export declare function activedNodeId(state: State, action: IAction<ID | undefined>): State;
