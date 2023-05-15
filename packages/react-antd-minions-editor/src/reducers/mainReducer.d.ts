import { Action } from "../actions";
import { IState } from "../interfaces/state";
export declare const mainReducer: ({ changeFlag, redoList, undoList, metas, selected, zoom }: IState | undefined, action: Action) => IState;
