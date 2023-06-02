import { IRestfulDataSource } from "../interfaces";

export interface IDataSouce2Config {
  entityName?: string;
}

export class DataSource2 implements IRestfulDataSource {
  constructor(private param: IDataSouce2Config) { }
  init(param: unknown): void {
    throw new Error("Method not implemented.");
  }
  getRequestInit(): RequestInit | undefined {
    throw new Error("Method not implemented.");
  }
  entityName?: string | undefined;
  idColumn?: string | undefined;
  toUrl(): string {
    throw new Error("Method not implemented.");
  }
  dataPath?: string | undefined;

}