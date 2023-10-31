import { ILogicFlowDefine } from "@rxdrag/minions-schema";

export interface IFxContext {
  fxMetas?: ILogicFlowDefine[]
}

export interface IExpContext {
  expVariables?: Record<string, unknown>
}

export interface ILoopScope {
  index?: number,
  value?: unknown,
}

export interface ILoopScopeContext {
  loopScope: ILoopScope | undefined
}
