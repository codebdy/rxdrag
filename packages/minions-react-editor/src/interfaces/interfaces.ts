import { IActivityDefine, ILineDefine } from "@rxdrag/minions";
import { ISnapshot } from "./state";

export type ILogicMetas = {
  nodes: IActivityDefine<undefined>[];
  lines: ILineDefine[];
}

export interface IEventMeta {
  name: string,
  label: string,
}

export interface INodeData {
  meta: IActivityDefine<undefined>
}

export type ZoomChangeListener = (zoom: number) => void
export type MetasChangeListener = (metas: ILogicMetas) => void
export type SelectedChangeListener = (selected?: string) => void
export type UndoListChangeListener = (undos: ISnapshot[]) => void
export type RedoListChangeListener = (redos: ISnapshot[]) => void
export type ChangeFlagChangeListener = (changeFlag: number) => void