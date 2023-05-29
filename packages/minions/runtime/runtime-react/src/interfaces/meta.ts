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
}
