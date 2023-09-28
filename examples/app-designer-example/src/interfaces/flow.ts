import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

export interface IVariable {
  id: ID,
  name?: string,
}

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
  id: string,
  scope: FxScope,
  //app, appFront,  Module or 循环组件
  ownerId: ID,
  type: LogicType,
}

export interface IScript {
  id: string,
  name?: string,
  code?: string,
  scope: FxScope,
  ownerId: ID,
  type: LogicType,
}