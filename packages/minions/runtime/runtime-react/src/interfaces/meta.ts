import { ILogicFlowDefine } from "@rxdrag/minions-schema";

export interface IVariableDefineMeta {
  id: string;
  name: string;
  defaultValue?: unknown;
}

export interface IControllerMeta {
  id: string;
  controllerType?: string;
  global?: boolean;
  name?: string;
  //属性表达式
  propExpressions?: {
    [prop: string]: string | undefined
  }
}

//逻辑编排控制器
export interface ILogicFlowControllerMeta extends IControllerMeta {
  events?: ILogicFlowDefine[];
  reactions?: ILogicFlowDefine[];
  variables?: IVariableDefineMeta[];
  //需要配置
  props?: string[];
}

export interface IScriptControllerMeta extends IControllerMeta {
  script?: string
}
