import { IQueryConfig, IResponseHandler, IRestfulQuerySession, Unsubscribe } from "../interfaces";
import { GlobalRestful } from "./Restful";


export class QuerySession implements IRestfulQuerySession {
  // handler要中转，来确保引用对GlobalQuery 不变
  private responseHandler: IResponseHandler;
  private responseHandlerFromParam?: IResponseHandler;
  private unsubscribe?: Unsubscribe
  constructor(private config?: IQueryConfig) {
    this.responseHandler = {
      onError: this.onError,
      onData: this.onData,
      onLoading: this.onLoading,
      onRevalidating: this.onRevalidating,
    }
  }
  query(param: string, handler?: IResponseHandler): void {
    this.responseHandlerFromParam = handler
    //重新订阅一次
    this.unsubscribe?.()
    this.unsubscribe = GlobalRestful.subscribeQuery(this.mergeParam(param), this.responseHandler)
  }
  destroy(): void {
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

  mergeParam(param?: string) {
    return { ...this.config, url: (this.config?.rootUrl || "") + (param || "") }
  }
}