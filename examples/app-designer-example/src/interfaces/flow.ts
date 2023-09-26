import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

export interface IVariable {
  id: ID,
  name?: string,
}

export interface IScopedILogicFlow extends ILogicFlowDefine {
  //对应控制器Id
  scopeId?: string;
}