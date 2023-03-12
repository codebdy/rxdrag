import { IAction, ThemeMode } from "interfaces/action";
export type State = ThemeMode;
export declare function themeMode(state: State, action: IAction<ThemeMode>): State;
