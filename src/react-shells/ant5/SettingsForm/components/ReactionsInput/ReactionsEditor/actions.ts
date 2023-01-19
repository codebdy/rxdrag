import { IStartNodeMeta } from "runner/reaction/metas"

export enum ActionType {
  START_LINE = 'ReactionsEditor/START_LINE',
  END_LINE = 'ReactionsEditor/END_LINE',
  ADD_START_NODE = 'ReactionsEditor/ADD_START_NODE',
  REMOVE_NODE = 'ReactionsEditor/REMOVE_NODE',
  CHANGE_NODE = 'ReactionsEditor/CHANGE_NODE',
}

export interface Action {
  type: ActionType
}

export interface AddStartNodeAcion extends Action {
  payload: IStartNodeMeta
}

export interface RemoveNodeAcion extends Action {
  payload: string // node uuid
}

export interface ChangeStartNodeAcion extends Action {
  payload: IStartNodeMeta
}