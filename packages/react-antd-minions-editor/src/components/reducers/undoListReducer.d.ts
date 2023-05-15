import { ISnapshot } from "../../interfaces";
import { Action } from "../actions";
export declare function undoListReducer(state: ISnapshot[], action: Action): ISnapshot[];
