import { IOwnedFlow, IOwnedScript } from "@rxdrag/minions-runtime-react";
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

export interface IFlow extends IOwnedFlow {
  scope?: FxScope,
  //app, appFront,  Module or 循环组件
  //ownerId: ID,
  type: LogicType,
  moduleId?: ID,
}

export interface IScript extends IOwnedScript {
  scope: FxScope,
  type: LogicType,
  moduleId?: ID,
}