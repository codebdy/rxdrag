/// <reference types="react" />
import { Graph } from "@antv/x6";
import { EditorStore } from "./classes/EditorStore";
import { IState } from "./interfaces/state";
export interface IReactionsEditorParams extends IState {
    graph?: Graph;
    dispatch: React.Dispatch<any>;
}
export declare const initialState: IState;
export declare const ReacionsEditorStoreContext: import("react").Context<EditorStore | undefined>;
export declare const GraphContext: import("react").Context<Graph | undefined>;
export declare const ControllerContext: import("react").Context<any>;
export declare const ControllersContext: import("react").Context<IControllerMeta[]>;
