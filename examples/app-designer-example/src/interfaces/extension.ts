import { ILogicMetas } from "@rxdrag/minions-logicflow-editor";
import { Type } from "@rxdrag/uml-schema";
import { IApp } from "./app";

export interface ArgMeta {
  id: string;
  name: string;
  label?: string;
  type: Type;
  typeId?: string;
  index?: number;
}

export enum OperateType {
  Query = "query",
  Mutation = "mutation",
  SubMethod = "subMethod"
}

export interface IExtension {
  /**
   * 唯一标识
   */
  id: string;

  /**
   * 字段名
   */
  name: string;

  description?: string;
  /**
   * 字段类型
   */
  type?: Type;

  /**
   * 类型id
   */
  typeId?: string;

  args?: ArgMeta[];

  operateType: OperateType;

  belongsTo?: IApp;
}

export interface IExtensionLogicFlow extends IExtension{
  logicMetas?: ILogicMetas;
}

export interface IExtendsionScript extends IExtension{
  code?: string;
}