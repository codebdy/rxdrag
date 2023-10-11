import { ILogicFlowDefine, IScriptDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

//主要用于识别循环内的编排
export interface IOwnedFlow extends ILogicFlowDefine {
  //app, appFront,  Module or 循环组件
  ownerId: ID,
}

//用于识别循环内的脚本
export interface IOwnedScript extends IScriptDefine {
  ownerId: ID,
}

export type LogicDefines = {
  flows?: IOwnedFlow[],
  scripts?: IOwnedScript[],
  fxFlows?: ILogicFlowDefine[],
  fxScripts?: IScriptDefine[],
}

