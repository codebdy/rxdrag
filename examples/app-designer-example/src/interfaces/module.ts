import { IVariable } from "@rxdrag/minions-schema";
import { IViewSchema } from "@rxdrag/schema";

export interface IModuleCategory {
  id: string,
  title?: string,
  modules?: IModule[],
}

export interface IModule {
  id: string,
  title?: string,
  //场景 schema，一个功能由多个场景组成，比如：列表、对话框等
  views?: IViewSchema[],
  variables?: IVariable[]
}

export interface IModuleInput {
  id?: string,
  title?: string,
  views?: IViewSchema[]
}
