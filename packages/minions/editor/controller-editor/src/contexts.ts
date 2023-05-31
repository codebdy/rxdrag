import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { createContext } from "react"

export interface IControllerEditorContextParam {
  controllers?: IControllerMeta[],
  controller?: IControllerMeta,
}

export const ControllerEditorContext = createContext<IControllerEditorContextParam>({})

