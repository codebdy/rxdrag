import { Graph } from "@antv/x6";
import { createContext } from "react";
import { ILogicMetas } from "runner/reaction/metas";

export interface IReactionsEditorParams {
  graph?: Graph
  lining?: boolean,
  setLining?: React.Dispatch<React.SetStateAction<boolean>>
  metas: ILogicMetas,
  dispatch: React.Dispatch<any>
}

export const ReacionsEditorContext = createContext<IReactionsEditorParams>({
  metas: {
    inputs: [],
    outputs: [],
    reactions: [],
    invakes: [],
  },
  dispatch: () => null,
})