import { IQueryParam, IReponseHandler, IRestfulQuery, Unsubscribe } from "../interfaces"
import { QueryRecord, QueryStatus } from "./QueryRecord"

export class RestfulQuery implements IRestfulQuery {
  cache: {
    [url: string]: QueryRecord | undefined
  } = {}

  clearCache(): void {
    this.cache = {}
  }

  subscribeQuery(param: IQueryParam, responseHandler: IReponseHandler): Unsubscribe {
    if (param.url) {
      const record = this.cache[param.url]
      //如果存在，注册handler
      if (record && !record.handlers.find(h => h === responseHandler)) {
        record.handlers.push(responseHandler)
      }
      if (record?.status === QueryStatus.complated) {
        responseHandler.onData?.(record.data)
        record.revalidate()
      } else if (record?.status === QueryStatus.querying) {
        responseHandler.onLoading?.(true)
      } else if (record?.status === QueryStatus.revalidating) {
        responseHandler.onRevalidating?.(true)
        responseHandler.onData?.(record.data)
      } else if (record?.status === QueryStatus.error) {
        //重新加载
        record.revalidate()
      } else if (!record) {
        const newRecord = new QueryRecord(param, [responseHandler])
        this.cache[param.url] = newRecord;
        //初次加载
        newRecord.load()
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