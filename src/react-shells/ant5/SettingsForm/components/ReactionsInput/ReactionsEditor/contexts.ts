import { Graph } from "@antv/x6";
import { createContext } from "react";

export interface IReactionsEditorParams {
  graph?: Graph
  lining?: boolean,
  setLining?: React.Dispatch<React.SetStateAction<boolean>>
}
export const ReacionsEditorContext = createContext<IReactionsEditorParams | undefined>(undefined)