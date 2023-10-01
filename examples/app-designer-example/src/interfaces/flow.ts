import { ILogicFlowMetas } from "@rxdrag/minions-schema";
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

export interface IFlow {
  id: string,
  name?: string,
  //显示文本
  label?: string;
  scope: FxScope,
  //app, appFront,  Module or 循环组件
  ownerId: ID,
  type: LogicType,
  metas?: ILogicFlowMetas,
}

export interface IScript {
  id: string,
  name?: string,
  code?: string,
  scope: FxScope,
  ownerId: ID,
  type: LogicType,
}