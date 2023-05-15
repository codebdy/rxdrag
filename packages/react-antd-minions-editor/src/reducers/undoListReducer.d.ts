import { Action } from "../actions";
import { ISnapshot } from "../interfaces/state";
export declare function undoListReducer(state: ISnapshot[], action: Action): ISnapshot[];
