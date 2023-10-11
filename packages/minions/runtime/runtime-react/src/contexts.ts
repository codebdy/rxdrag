import { ILogicFlowDefine, IScriptDefine } from "@rxdrag/minions-schema"
import { IOwnedFlow, IOwnedScript } from "./interfaces"
import { createContext, useContext } from "react"

export type LogicDefines = {
  flows?: IOwnedFlow[],
  scripts?: IOwnedScript[],
  fxFlows?: ILogicFlowDefine[],
  fxScripts?: IScriptDefine[],
}

export const LogicDefinesContext = createContext<LogicDefines | undefined>(undefined)

export function useLogicDefines() {
  return useContext(LogicDefinesContext)
}