import { Graph } from "@antv/x6";
import { createContext } from "react";
import { IControllerMeta, ILogicMetas } from "runner/minions/interfaces/metas";
import { EditorStore } from "./classes/EditorStore";

export interface ISnapshot extends ILogicMetas {
  selected?: string,
}

export interface IState {
  changeFlag: number,
  undoList: ISnapshot[],
  redoList: ISnapshot[],
  metas: ILogicMetas,
  selected?: string,
  zoom: number,
}

export interface IReactionsEditorParams extends IState {
  graph?: Graph
  dispatch: React.Dispatch<any>
}

export const initialState: IState = {
  changeFlag: 0,
  undoList: [],
  redoList: [],
  metas: {
    reactions: [],
    invokes: [],
  },
  selected: undefined,
  zoom: 1,
}

//这个动态context会导致大量刷新，影响性能，以后考虑用Redux或者Recoil换掉
//或者一个变量一个Context也能解决问题，但是不如Recoil方便
export const ReacionsEditorStoreContext = createContext<EditorStore | undefined>(undefined)


export const GraphContext = createContext<Graph | undefined>(undefined)
export const ControllerContext = createContext<IControllerMeta | undefined>(undefined)