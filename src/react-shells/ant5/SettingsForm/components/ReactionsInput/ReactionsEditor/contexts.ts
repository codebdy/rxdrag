import { Graph } from "@antv/x6";
import { createContext } from "react";
import { ILogicMetas } from "runner/reaction/interfaces/metas";

export interface IState {
  lining: boolean,
  undoList: ILogicMetas[],
  redoList: ILogicMetas[],
  metas: ILogicMetas,
  selected?: string,
  zoom: number,
}

export interface IReactionsEditorParams extends IState {
  graph?: Graph
  dispatch: React.Dispatch<any>
}

export const initialState: IState = {
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