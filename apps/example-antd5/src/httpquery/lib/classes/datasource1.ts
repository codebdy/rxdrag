import { IRestfulDataSource } from "../interfaces";

export interface IDataSouce1Config {
  entityName?: string;
}

export class DataSource1 implements IRestfulDataSource {
  constructor(private param: IDataSouce1Config) { }

  entityName?: string | undefined;
  idColumn?: string | undefined;
  toUrl(): string {
    throw new Error("Method not implemented.");
  }
  getInit(): RequestInit | undefined {
    throw new Error("Method not implemented.");
  }
  dataPath?: string | undefined;
}