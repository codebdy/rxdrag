import { IQueryParam, IReponseHandler, IRestfulQuerySession, Unsubscribe } from "../interfaces";
import { GlobalQuery } from "./RestfulQuery";

export interface IDataSouce1Config {
  rootUrl?: string;
  entityName?: string;
  requestInit?: RequestInit;
  dataPath?: string;
  idColumn?: string;
}

export class QuerySession1 implements IRestfulQuerySession {
  // handler要中转，来确保引用对GlobalQuery 不变
  private responseHandler: IReponseHandler;
  //private param?: IQueryParam;
  private responseHandlerFromParam?: IReponseHandler;
  private unsubscribe?: Unsubscribe
  constructor(private config: IDataSouce1Config) {
    this.responseHandler = {
      onError: this.onError,
      onData: this.onData,
      onLoading: this.onLoading,
      onRevalidating: this.onRevalidating,
    }
  }
  query(param: IQueryParam, handler?: IReponseHandler): void {
    this.responseHandlerFromParam = handler
    //重新订阅一次
    this.unsubscribe?.()
    this.unsubscribe = GlobalQuery.subscribeQuery(this.mergeParam(param), this.responseHandler)
  }
  destory(): void {
    this.unsubscribe?.()
    this.unsubscribe = undefined
  }

  onError = (error?: Error) => {
    this.responseHandlerFromParam?.onError?.(error);
  }

  onData = (data?: unknown) => {
    this.responseHandlerFromParam?.onData?.(data);
  }
  onLoading = (loading?: boolean) => {
    this.responseHandlerFromParam?.onLoading?.(loading)
  }
  onRevalidating = (revalidating?: boolean) => {
    this.responseHandlerFromParam?.onRevalidating?.(revalidating)
  }

  mergeParam(param: IQueryParam) {
    return { ...param, url: (this.config.rootUrl || "") + param.url }
  }
}