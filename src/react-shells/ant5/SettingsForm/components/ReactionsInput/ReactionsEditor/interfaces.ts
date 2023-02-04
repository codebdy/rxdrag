import { IConfigMeta, ILogicMetas, IReactionNodeMeta } from "runner/reaction/interfaces/metas";
import { ISnapshot } from "./contexts";

export interface IEventMeta {
  name: string,
  label: string,
}

export interface INodeData {
  meta: IReactionNodeMeta<IConfigMeta>
}

export type ZoomChangeListener = (zoom: number) => void
export type MetasChangeListener = (metas: ILogicMetas) => void
export type SelectedChangeListener = (selected?: string) => void
export type UndoListChangeListener = (undos: ISnapshot[]) => void
export type RedoListChangeListener = (redos: ISnapshot[]) => void
export type ChangeFlagChangeListener = (changeFlag: number) => void