import { ILogicFlowDefine, IScriptDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

export enum FxScope {
  module = "module",
  device = "device",
  app = "app",
}

export enum LogicType {
  normal = "normal",
  fx = "fx"
}

export interface IFlow extends ILogicFlowDefine {
  scope?: FxScope,
  //app, appFront,  Module or 循环组件
  ownerId: ID,
  type: LogicType,
  moduleId?: ID,
}

export interface IScript extends IScriptDefine {
  scope: FxScope,
  ownerId: ID,
  type: LogicType,
  moduleId?: ID,
}