import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { IViewSchema } from "@rxdrag/schema";
import { IScript } from "./script";
import { IFlow, IVariable } from "./flow";

export interface IModuleCategory {
  id: string,
  title?: string,
  modules?: IModule[],
}

export interface ILogicFlow extends ILogicFlowDefine {
  scope?: string,
}

export interface IScript extends IScript {
  scope?: string,
}

export interface IModule {
  id: string,
  title?: string,
  //场景 schema，一个功能由多个场景组成，比如：列表、对话框等
  views?: IViewSchema[],
  fxFlows?: IFlow[],
  fxScripts?: IScript[],
  flows?: IFlow[],
  variables?: IVariable[]
  scripts?: IScript[],
}

export interface IModuleInput {
  id?: string,
  title?: string,
  views?: IViewSchema[]
}
