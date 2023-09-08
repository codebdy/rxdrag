import { IDocumentSchema } from "@rxdrag/schema";

export interface IModuleSchema {
  id: string,
  title?: string,
  //场景 schema，一个功能由多个场景组成，比如：主页、对话框等
  scenes: IDocumentSchema[],
  category?: IModuleCategory,
}

export interface IModuleSchemaInput {
  id?: string,
  title?: string,
  scenes?: IDocumentSchema[]
}

export interface IModuleCategory {
  id: string,
  title?: string,
  modules?: IModuleSchema[],
}

export interface IModuleCategoryInput {
  id?: string,
  title?: string,
}