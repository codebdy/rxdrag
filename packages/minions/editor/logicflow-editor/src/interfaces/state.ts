import { INodeDefine, ILineDefine } from "@rxdrag/minions-schema";

export interface ISnapshot {
  nodes: INodeDefine<unknown>[];
  lines: ILineDefine[];
  selected?: string,
}

export interface IState {
  changeFlag: number,
  undoList: ISnapshot[],
  redoList: ISnapshot[],
  nodes: INodeDefine<unknown>[];
  lines: ILineDefine[];
  selected?: string,
  zoom: number,
  showMap: boolean,
}

export const initialState: IState = {
  changeFlag: 0,
  undoList: [],
  redoList: [],
  nodes: [],
  lines: [],
  selected: undefined,
  zoom: 1,
  showMap: false,
}

