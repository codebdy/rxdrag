import { Graph } from "@antv/x6";
import { createContext } from "react";

export interface IReactionsEditorParams {
  graph?: Graph
}
export const ReacionsEditorContext = createContext<IReactionsEditorParams | undefined>(undefined)