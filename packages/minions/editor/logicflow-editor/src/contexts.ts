import { Graph } from "@antv/x6";
import { ReactNode, createContext } from "react";
import { EditorStore } from "./classes/EditorStore";
import { IState } from "./interfaces/state";
import { Action } from "./actions";
import { IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema";
import { IThemeToken } from "./interfaces";


export interface IReactionsEditorParams extends IState {
  graph?: Graph
  dispatch: React.Dispatch<Action>
}

export const initialState: IState = {
  changeFlag: 0,
  undoList: [],
  redoList: [],
  nodes: [],
  lines: [],
  selected: undefined,
  zoom: 1,
}

export const LogicFlowEditorStoreContext = createContext<EditorStore | undefined>(undefined)
export const GraphContext = createContext<Graph | undefined>(undefined)
export const MaterialsContext = createContext<IActivityMaterial<ReactNode>[]>([])
export const ThemeTokenContext = createContext<IThemeToken>({})

//全局上下文，主要用于getSubTitle
export const LogicFlowContext = createContext<unknown>(undefined)
//所有可以被引用的编排
export const CanBeReferencedLogicFlowMetasContext = createContext<ILogicFlowDefine[]>([])

