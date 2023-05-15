import { IState } from "../../interfaces";
import { Action } from "../actions";
export declare const mainReducer: ({ changeFlag, redoList, undoList, metas, selected, zoom }: IState | undefined, action: Action) => IState;
