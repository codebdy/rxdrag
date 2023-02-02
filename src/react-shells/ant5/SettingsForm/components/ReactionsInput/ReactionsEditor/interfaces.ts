import { IReactionNodeMeta } from "runner/reaction/interfaces/metas";

export interface IEventMeta {
  name: string,
  label: string,
}

export interface INodeData {
  meta: IReactionNodeMeta
}

export type ZoomChangeListener = (zoom: number) => void