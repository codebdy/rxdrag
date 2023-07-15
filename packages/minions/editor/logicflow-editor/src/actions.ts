import { ISnapshot } from "./interfaces/state"
import { IActivityNode, ILogicMetas } from "./interfaces"
import { ILineDefine } from "@rxdrag/minions-schema"

export enum ActionType {
  ADD_NODE = 'ReactionsEditor/ADD_NODE',
  REMOVE_NODE = 'ReactionsEditor/REMOVE_NODE',
  CHANGE_NODE = 'ReactionsEditor/CHANGE_NODE',
  EMBED_NODE = 'ReactionsEditor/EMBED_NODE',

  ADD_EDGE = 'ReactionsEditor/ADD_EDGE',
  CHANGE_EDGE = 'ReactionsEditor/CHANGE_EDGE',
  REMOVE_EDGE = 'ReactionsEditor/REMOVE_EDGE',

  SELECTION = 'ReactionsEditor/SELECTION',
  SET_ZOOM = 'ReactionsEditor/SET_ZOOM',

  SHOW_MAP = 'ReactionsEditor/SHOW_MAP',

  BACKUP = 'ReactionsEditor/BACKUP',
  SET_REDOLIST = 'ReactionsEditor/SET_REDOLIST',
  SET_UNOLIST = 'ReactionsEditor/SET_UNOLIST',
  SET_METAS = 'ReactionsEditor/SET_METAS',

  SET_CHANGE_FLAG = 'ReactionsEditor/SET_CHANGE_FLAG',
}


export interface Action {
  type: ActionType,
  payload?: IActivityNode | string | ILineDefine | number | ISnapshot | ISnapshot | ISnapshot[] | ILogicMetas | boolean
}

export interface AddNodeAction extends Action {
  payload: IActivityNode
}

export interface RemoveNodeAction extends Action {
  payload: string // node uuid
}

export interface ChangeNodeAction extends Action {
  payload: IActivityNode
}

export interface EmbedNodeAction extends Action {
  parentId: string,
  payload: IActivityNode
}

export interface AddEdgeAction extends Action {
  parentId?: string,
  payload: ILineDefine
}

export interface ChangeEdgeAction extends Action {
  parentId?: string,
  payload: ILineDefine
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

export interface ShowMapAction extends Action {
  payload: boolean
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

export interface SetMetasAction extends Action {
  payload: ILogicMetas
}

export interface SetChangeFlagAction extends Action {
  payload: number
}



