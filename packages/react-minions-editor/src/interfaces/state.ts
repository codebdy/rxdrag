import { Graph } from "@antv/x6";
import { ILogicMetas } from "@rxdrag/schema";

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

