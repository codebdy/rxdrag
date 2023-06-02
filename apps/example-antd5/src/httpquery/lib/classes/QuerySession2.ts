import { IQueryParam, IReponseHandler, IRestfulQuerySession } from "../interfaces";

export interface IDataSouce2Config {
  entityName?: string;
}

export class QuerySession2 implements IRestfulQuerySession {
  constructor(private param: IDataSouce2Config) { }
  query(param: IQueryParam, responseOptions: IReponseHandler): void {
    throw new Error("Method not implemented.");
  }
  destory(): void {
    throw new Error("Method not implemented.");
  }
  init(param: unknown): void {
    throw new Error("Method not implemented.");
  }

}