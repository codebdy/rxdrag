import axios from "axios"
import { IPostParam, IQueryParam, IResponseHandler, Unsubscribe } from "../interfaces"
import { QueryRecord, QueryStatus } from "./QueryRecord"
import _ from "lodash"

export const PREDEFINED_POST_HEADERS = {
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json'
  },
  method: "post"
}

export class Restful {
  cache: {
    [url: string]: QueryRecord | undefined
  } = {}

  clearCache = (): void => {
    this.cache = {}
  }

  subscribeQuery = (param: IQueryParam, responseHandler: IResponseHandler): Unsubscribe => {
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
  unsubscribeQuery = (url: string, handler: IResponseHandler): void => {
    const record = this.cache[url]
    if (!record) {
      console.warn("Can not find QueryRecord by url", url)
      return;
    }

    record.handlers = record.handlers.filter(hd => hd !== handler)
  }
  save = (param: IPostParam, handler: IResponseHandler): void => {
    if (!param.url) {
      console.error("Post url is emperty")
      return
    }
    handler?.onLoading?.(true)
    axios(param.url, { ..._.merge(PREDEFINED_POST_HEADERS, param.axiosConfig), data: param.data }).then((res) => {
      const data = res.data;
      if (param.entityName) {
        this.onEntityPosted(param.entityName, data)
      }
      handler?.onData?.(data)
    }).catch(e => {
      console.error(e)
      handler?.onError?.(e)
    }).finally(() => {
      handler?.onLoading?.(false)
    })
  }

  onEntityPosted = (entity: string, data: unknown) => {
    for (const key of Object.keys(this.cache)) {
      const queryRecord = this.cache[key]
      if (queryRecord?.param.entityName === entity) {
        queryRecord.mutateData(data)
      }
    }
  }
}

export const GlobalRestful = new Restful()