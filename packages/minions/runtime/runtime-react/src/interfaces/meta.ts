import { ILogicFlowDefinition } from "@rxdrag/minions-schema";

export interface IVariableDefineMeta {
  id: string;
  name: string;
  defaultValue?: unknown;
}

export interface IControllerMeta {
  id: string;
  controllerType?: string;
  //enable?: boolean;
  global?: boolean;
  name?: string;
  //属性表达式
  propExpressions?: {
    [prop: string]: string | undefined
  }
}

//逻辑编排控制器
export interface ILogicFlowControllerMeta extends IControllerMeta {
  events?: ILogicFlowDefinition[];
  reactions?: ILogicFlowDefinition[];
  variables?: IVariableDefineMeta[];
  //需要配置
  props?: string[];
}

export interface IScriptControllerMeta extends IControllerMeta {
  script?: string
}
