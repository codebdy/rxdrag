import { ILogicFlowDefine } from "@rxdrag/minions-schema";

export interface IFxContext {
  fxMetas?: ILogicFlowDefine[]
}

export interface IExpContext {
  expVariables?: Record<string, unknown>
}

export interface ILogicScope {
  index?: number,
  value?: unknown,
  parent?: unknown,
}

export interface ILogicScopeContext {
  logicScope: ILogicScope | undefined
}
