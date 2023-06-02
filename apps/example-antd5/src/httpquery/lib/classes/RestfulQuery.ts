import { IQueryParam, IReponseHandler, IRestfulQuery, Unsubscribe } from "../interfaces"

export enum QueryStatus {
  querying = 1,
  error,
  revalidating,
  complated,
}

export interface IQueryRecord {
  param: IQueryParam
  status?: QueryStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  handlers: IReponseHandler[]
}

export class RestfulQuery implements IRestfulQuery {
  cache: {
    [url: string]: IQueryRecord | undefined
  } = {}

  clearCache(): void {
    this.cache = {}
  }

  subscribeQuery(param: IQueryParam, responseHandler: IReponseHandler): Unsubscribe {
    if (param.url) {
      const record = this.cache[param.url]
      if (record && !record.handlers.find(h => h === responseHandler)) {
        record.handlers.push(responseHandler)
      }
      if (record?.status === QueryStatus.complated) {
        responseHandler.onData?.(record.data)
      } else if (record?.status === QueryStatus.querying) {
        responseHandler.onLoading?.(true)
      } else if (record?.status === QueryStatus.revalidating){
        responseHandler.onRevalidating?.(true)
        responseHandler.onData?.(record.data)
      } else if (record?.status === QueryStatus.error){
        //重新加载
      } else if (!record){
        //初次加载
      }
    }

    return () => {
      param.url && this.unsubscribeQuery(param.url, responseHandler)
    }
  }
  unsubscribeQuery(url: string, handler: IReponseHandler): void {
    const record = this.cache[url]
    if (!record) {
      console.warn("Can not find QueryRecord by url", url)
      return;
    }

    record.handlers = record.handlers.filter(hd => hd !== handler)
  }
  save(): void {
    throw new Error("Method not implemented.")
  }

}

export const GlobalQuery = new RestfulQuery()