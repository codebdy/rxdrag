import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

export interface IVariable {
  id: ID,
  name?: string,
}

export interface IFlow extends ILogicFlowDefine {
  //对应控制器Id
  scopedIn?: ID;
}