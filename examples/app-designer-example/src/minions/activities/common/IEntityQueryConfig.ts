import { IEntityConfig } from "./IEntityConfig";


export interface IEntityQueryConfig extends IEntityConfig {
  noQueryOnInit?: boolean;
  queryOnFocus?: boolean;
  pollingTime?: number;
  queryParams?: unknown;
}
