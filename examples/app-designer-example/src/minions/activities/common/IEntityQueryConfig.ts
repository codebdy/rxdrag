import { IEntityConfig } from "./IEntityConfig";
import { IExpression, IExpressionGroup } from "./interfaces";

export enum Order {
  desc = "desc",
  asc = "asc"
}

export interface ISort {
  attributeId: string,
  order: Order
}

export interface IAssociationParam extends IQureyEnitiyParam {
  assoId: string,
}

export interface IQureyEnitiyParam {
  expressions?: (IExpression | IExpressionGroup)[],
  sorts?: ISort[],
  attributes?: string[],
  associations?: IAssociationParam[],
}

export interface IEntityQueryConfig extends IEntityConfig {
  queryOnFocus?: boolean;
  pollingTime?: number;
  queryParams?: IQureyEnitiyParam;
}

export interface IEntityListQueryConfig extends IEntityQueryConfig {
  pageSize?: number,
}
