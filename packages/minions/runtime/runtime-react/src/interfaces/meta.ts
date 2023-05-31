import { ILogicFlowDefinition } from "@rxdrag/minions-schema";

export interface IVariableDefineMeta {
  id: string;
  name: string;
  defaultValue?: unknown;
}

export interface IControllerMeta {
  id: string;
  enable?: boolean;
  global?: boolean;
  name?: string;
  events?: ILogicFlowDefinition[];
  reactions?: ILogicFlowDefinition[];
  variables?: IVariableDefineMeta[];
  //可以配置，如果没有配置的话，可以在解析时填充
  props?: string[];
}
