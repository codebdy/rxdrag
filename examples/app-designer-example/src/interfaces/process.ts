import { ID } from "@rxdrag/shared";
import { IApp, IAppInput } from "./app";

export interface IProcessCategory {
  id: ID;
  name?: string;
  app?: IApp;
}

export interface IProcessCategoryInput {
  id?: ID;
  name?: string;
  app?: { sync: IAppInput };
}

export interface IProcess {
  id: ID;
  name?: string;
  categoryId?: string;
  xml?: string,
  instances?: IProcessInstance[];
  app?: IApp;
}

export interface IProcessInstance {
  id: ID;
  approvalStatus?: string;
  process?: IProcess;
}

export interface IProcessInput {
  id?: ID;
  name?: string;
  categoryId?: string;
  xml?: string,
  app?: { sync: IAppInput }
}

export interface IProcessInstanceInput {
  id?: ID;
  approvalStatus?: string;
  process?: { sync: IProcessInput };
}