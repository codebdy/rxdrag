import { IActivityDefine, IConfigMeta, ILineDefine } from "@rxdrag/schema";
import { ISnapshot } from "./state";

export type ILogicMetas = {
  nodes: IActivityDefine<IConfigMeta>[];
  lines: ILineDefine[];
}

export interface IEventMeta {
  name: string,
  label: string,
}

export interface INodeData {
  meta: IActivityDefine<IConfigMeta>
}

export type ZoomChangeListener = (zoom: number) => void
export type MetasChangeListener = (metas: ILogicMetas) => void
export type SelectedChangeListener = (selected?: string) => void
export type UndoListChangeListener = (undos: ISnapshot[]) => void
export type RedoListChangeListener = (redos: ISnapshot[]) => void
export type ChangeFlagChangeListener = (changeFlag: number) => void