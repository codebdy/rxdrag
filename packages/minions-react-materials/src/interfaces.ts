import { IDesignerEngine } from "@rxdrag/core";
import { IActivityMaterial, ILogicFlowDefine, IVariable } from "@rxdrag/minions-schema";
import { INodeSchema } from "@rxdrag/schema";
import { ReactNode } from "react";

export type LogicflowContextParam = {
  engine?: IDesignerEngine,
  variables?: IVariable[],
  fxFlowMetas?: ILogicFlowDefine[],
  t?: (key: string) => string,
}

export type IRxDragActivityMaterial<SetPropConfig = unknown, MaterialContext = unknown> = IActivityMaterial<ReactNode, INodeSchema, SetPropConfig, MaterialContext>