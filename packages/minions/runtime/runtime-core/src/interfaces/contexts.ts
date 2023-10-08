import { ILogicFlowDefine } from "@rxdrag/minions-schema";

export interface IFxContext {
  fxMetas?: ILogicFlowDefine[]
}

export interface ILoopScope {
  index?: number,
  row?: unknown,
}

export interface ILoopScopeContext {
  loopScope: ILoopScope | undefined
}
