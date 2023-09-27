import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { ID } from "@rxdrag/shared";

export enum FxScope {
  module = "module",
  device = "device",
  app = "app",
}

export interface IFxFlow extends ILogicFlowDefine {
  id: string,
  title?: string,
  scope: FxScope,
  //app, appFront, or Module
  ownerId: ID,
}

export interface IFxScript {
  id: string,
  title?: string,
  code?: string,
  scope: FxScope,
  ownerId: ID,
}