import { Graph } from "@antv/x6";
import { createContext } from "react";
import { EditorStore } from "./classes/EditorStore";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { IThemeToken } from "./interfaces";

export const notMethod = () => { throw new Error("Not implement method") }
export const LogicFlowEditorStoreContext = createContext<EditorStore | undefined>(undefined)

export type GraphState = [Graph | undefined, React.Dispatch<React.SetStateAction<Graph | undefined>>]
export const GraphContext = createContext<GraphState>([undefined, notMethod])


export type MaterialsState = [IActivityMaterial[], React.Dispatch<React.SetStateAction<IActivityMaterial[]>>]
export const MaterialsContext = createContext<MaterialsState>([[], notMethod])
export const ThemeTokenContext = createContext<IThemeToken>({})

//全局上下文，主要用于getSubTitle
export const LogicFlowContext = createContext<unknown|undefined>(undefined)


