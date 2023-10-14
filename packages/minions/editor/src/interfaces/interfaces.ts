import { INodeDefine, ILineDefine } from "@rxdrag/minions-schema";
import { ISnapshot } from "./state";

export interface IX6NodeDefine {
  /** 节点x坐标 */
  x: number;
  /** 节点y坐标  */
  y: number;
  /** 节点宽度 */
  width: number;
  /** 节点高度 */
  height: number;
}

export interface IActivityNode<Config = unknown> extends INodeDefine<Config> {
  x6Node?: IX6NodeDefine
}

export type ILogicMetas = {
  nodes: IActivityNode[];
  lines: ILineDefine[];
}

export interface INodeData {
  meta: INodeDefine<undefined>
}

export type ZoomChangeListener = (zoom: number) => void
export type ShowMapChangeListener = (showMap: boolean) => void
export type MetasChangeListener = (metas: ILogicMetas) => void
export type SelectedChangeListener = (selected?: string) => void
export type UndoListChangeListener = (undos: ISnapshot[]) => void
export type RedoListChangeListener = (redos: ISnapshot[]) => void
export type ChangeFlagChangeListener = (changeFlag: number) => void