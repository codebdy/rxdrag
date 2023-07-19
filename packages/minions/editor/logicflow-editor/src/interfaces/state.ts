import { INodeDefine, ILineDefine } from "@rxdrag/minions-schema";

//操作快照
export interface ISnapshot {
  //全部节点
  nodes: INodeDefine<unknown>[];
  //全部连线
  lines: ILineDefine[];
  //当前选中元素
  selected?: string,
}

//编辑器状态
export interface IState {
  //是否被修改，该标识用于提示是否需要保存
  changeFlag: number,
  //撤销快照列表
  undoList: ISnapshot[],
  //重做快照列表
  redoList: ISnapshot[],
  //全部节点
  nodes: INodeDefine<unknown>[];
  //全部连线
  lines: ILineDefine[];
  //当前选中元素
  selected?: string,
  //画布缩放数值
  zoom: number,
  //是否显示小地图
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

