import { ILogicFlowDefinition } from "@rxdrag/minions-schema";

export interface IVariableDefineMeta {
  id: string;
  name: string;
  defaultValue?: unknown;
}

export interface IControllerMeta {
  id: string;
  controllerType?: string;
  enable?: boolean;
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
  //可以配置，如果没有配置的话，可以在解析时填充
  props?: string[];
}

export interface IScriptControllerMeta extends IControllerMeta {
  script?: string
}
