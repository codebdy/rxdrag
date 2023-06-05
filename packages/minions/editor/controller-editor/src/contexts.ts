import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { createContext } from "react"

export interface IControllerEditorContextParam {
  controllers?: ILogicFlowControllerMeta[],
  controller?: ILogicFlowControllerMeta,
}

export const ControllerEditorContext = createContext<IControllerEditorContextParam>({})

