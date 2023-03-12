import { IConfigMeta, ILogicMetas, IReactionMeta } from "runner/minions/interfaces/metas";
import { ISnapshot } from "./contexts";

export interface IEventMeta {
  name: string,
  label: string,
}

export interface INodeData {
  meta: IReactionMeta<IConfigMeta>
}

export type ZoomChangeListener = (zoom: number) => void
export type MetasChangeListener = (metas: ILogicMetas) => void
export type SelectedChangeListener = (selected?: string) => void
export type UndoListChangeListener = (undos: ISnapshot[]) => void
export type RedoListChangeListener = (redos: ISnapshot[]) => void
export type ChangeFlagChangeListener = (changeFlag: number) => void