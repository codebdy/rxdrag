import { Graph } from "@antv/x6";
import { IControllerMeta } from "@rxdrag/schema";
import { createContext } from "react";
import { EditorStore } from "./classes/EditorStore";
import { IState } from "./interfaces/state";
import { Action } from "./actions";


export interface IReactionsEditorParams extends IState {
  graph?: Graph
  dispatch: React.Dispatch<Action>
}

export const initialState: IState = {
  changeFlag: 0,
  undoList: [],
  redoList: [],
  nodes: [],
  lines: [],
  selected: undefined,
  zoom: 1,
}

export const ReacionsEditorStoreContext = createContext<EditorStore | undefined>(undefined)

export const GraphContext = createContext<Graph | undefined>(undefined)
export const ControllerContext = createContext<IControllerMeta | undefined>(undefined)
export const ControllersContext = createContext<IControllerMeta[]>([])

