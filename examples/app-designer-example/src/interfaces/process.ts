import { ID } from "@rxdrag/shared";
import { IApp, IAppInput } from "./app";

export interface IProcessCategory {
  id: ID;
  uuid: string;
  name?: string;
  app?: IApp;
}

export interface IProcessCategoryInput {
  id?: ID;
  uuid?: string;
  name?: string;
  app?: { sync: IAppInput };
}

export interface IProcess {
  id: ID;
  uuid: string;
  name?: string;
  categoryUuid?: string;
  xml?: string,
  instances?: IProcessInstance[];
}

export interface IProcessInstance {
  id: ID;
  approvalStatus?: string;
  process?: IProcess;
}

export interface IProcessInput {
  id?: ID;
  uuid?: string;
  name?: string;
  categoryUuid?: string;
  xml?: string,
  app?: { sync: IAppInput }
}

export interface IProcessInstanceInput {
  id?: ID;
  approvalStatus?: string;
  process?: { sync: IProcessInput };
}