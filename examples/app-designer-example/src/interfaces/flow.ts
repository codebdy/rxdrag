import { ILogicFlowDefine } from "@rxdrag/minions-schema";

export interface IScopedILogicFlow extends ILogicFlowDefine {
  scope?: string;
}