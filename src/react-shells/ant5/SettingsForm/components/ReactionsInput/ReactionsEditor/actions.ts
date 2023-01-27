import { IInvokeMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas"
import { ISnapshot } from "./contexts"

export enum ActionType {
  START_LINE = 'ReactionsEditor/START_LINE',
  END_LINE = 'ReactionsEditor/END_LINE',
  ADD_NODE = 'ReactionsEditor/ADD_NODE',
  REMOVE_NODE = 'ReactionsEditor/REMOVE_NODE',
  CHANGE_NODE = 'ReactionsEditor/CHANGE_NODE',

  ADD_EDGE = 'ReactionsEditor/ADD_EDGE',
  CHANGE_EDGE = 'ReactionsEditor/CHANGE_EDGE',
  REMOVE_EDGE = 'ReactionsEditor/REMOVE_EDGE',

  SELECTION = 'ReactionsEditor/SELECTION',
  SET_ZOOM = 'ReactionsEditor/SET_ZOOM',

  BACKUP = 'ReactionsEditor/BACKUP',
  SET_REDOLIST = 'ReactionsEditor/SET_REDOLIST',
  SET_UNOLIST = 'ReactionsEditor/SET_UNOLIST',
}

export interface Action {
  type: ActionType
}

export interface AddNodeAction extends Action {
  payload: IReactionNodeMeta
}

export interface RemoveNodeAction extends Action {
  payload: string // node uuid
}

export interface ChangeNodeAction extends Action {
  payload: IReactionNodeMeta
}

export interface AddEdgeAction extends Action {
  payload: IInvokeMeta
}

export interface ChangeEdgeAction extends Action {
  payload: IInvokeMeta
}

export interface RemoveEdgeAction extends Action {
  payload: string // Edge uuid
}

export interface SelectionAction extends Action {
  payload: string | undefined // Cell id
}

export interface SetZoomAction extends Action {
  payload: number
}

export interface BackupAction extends Action {
  payload: ISnapshot
}

export interface SetUndoListAction extends Action {
  payload: ISnapshot[]
}

export interface SetRedoListAction extends Action {
  payload: ISnapshot[]
}

