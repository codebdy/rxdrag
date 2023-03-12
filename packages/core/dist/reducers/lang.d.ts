import { IAction } from "interfaces/action";
export type State = string;
export declare const DefualtLang = "zh-CN";
export declare function lang(state: State, action: IAction<string>): State;
