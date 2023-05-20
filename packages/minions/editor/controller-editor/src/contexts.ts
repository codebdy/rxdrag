import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { createContext } from "react"

export const ControllerMetaContext = createContext<IControllerMeta | undefined>(undefined)
export const ControllerMetasContext = createContext<IControllerMeta[]>([])