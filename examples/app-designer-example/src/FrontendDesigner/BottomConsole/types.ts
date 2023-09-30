import { IDesignerEngine } from "@rxdrag/core"
import { IVariable } from "../../interfaces/flow"

export type LogicflowContextParam = {
  engine?: IDesignerEngine,
  variables?: IVariable[]
}