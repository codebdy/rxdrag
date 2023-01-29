import { Graph } from "@antv/x6";
import { createContext } from "react";
import { ILogicMetas } from "runner/reaction/interfaces/metas";

export interface ISnapshot extends ILogicMetas {
  selected?: string,
}

export interface IState {
  changeFlag: number,
  lining: boolean,
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
  lining: false,
  undoList: [],
  redoList: [],
  metas: {
    reactions: [],
    invokes: [],
  },
  selected: undefined,
  zoom: 1,
}

export const ReacionsEditorContext = createContext<IReactionsEditorParams>({
  ...initialState,
  dispatch: () => null,
})