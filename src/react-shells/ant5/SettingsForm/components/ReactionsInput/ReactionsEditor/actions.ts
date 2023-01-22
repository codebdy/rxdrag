import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"

export enum ActionType {
  START_LINE = 'ReactionsEditor/START_LINE',
  END_LINE = 'ReactionsEditor/END_LINE',
  ADD_NODE = 'ReactionsEditor/ADD_NODE',
  REMOVE_NODE = 'ReactionsEditor/REMOVE_NODE',
  CHANGE_NODE = 'ReactionsEditor/CHANGE_NODE',
}

export interface Action {
  type: ActionType
}

export interface AddNodeAcion extends Action {
  payload: IReactionNodeMeta
}

export interface RemoveNodeAcion extends Action {
  payload: string // node uuid
}

export interface ChangeNodeAcion extends Action {
  payload: IReactionNodeMeta
}