/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQueryParam, IResponseHandler } from "../interfaces";
import _ from "lodash"
import axios from 'axios';

export enum QueryStatus {
  querying = 1,
  error,
  revalidating,
  complated,
}

export const PREDEFINED_HEADERS = {
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json'
  }
}

export class QueryRecord {
  status?: QueryStatus;
  data?: any;
  constructor(public param: IQueryParam, public handlers: IResponseHandler[]) { }

  mutateData(data: any) {
    const idName = this.param?.idField || "id"
    const id = data?.[idName]
    if (this.data?.nodes?.find((item: any) => item?.[idName] === id)) {
      this.data = { ...this.data, nodes: this.data?.nodes?.map((item: any) => item?.[idName] === id ? {...item, ...data} : item) }
      this.emitData(this.data)
      this.revalidate()
    }
  }

  revalidate() {
    if (this.param.url) {
      this.emitRevalidating(true)
      this.status = QueryStatus.revalidating
      axios(this.param.url, _.merge(PREDEFINED_HEADERS, this.param.axiosConfig)).then((res) => {
        this.data = res.data
        this.emitData(this.data)
        this.emitRevalidating(false)
        this.status = QueryStatus.complated
      }).catch(e => {
        console.error(e)
        this.emitError(e)
        this.emitRevalidating(false)
        this.status = QueryStatus.error
      })
    }
  }

  load() {
    if (this.param.url) {
      this.emitLoading(true)
      this.status = QueryStatus.querying
      axios(this.param.url, _.merge(PREDEFINED_HEADERS, this.param.axiosConfig)).then((res) => {
        this.data = res.data
        this.emitData(this.data)
        this.emitLoading(false)
        this.status = QueryStatus.complated
      }).catch(e => {
        console.error(e)
        this.emitError(e)
        this.emitLoading(false)
        this.status = QueryStatus.error
      })
    }
  }

  emitRevalidating(validating?: boolean) {
    for (const h of this.handlers) {
      h.onRevalidating?.(validating)
    }
  }

  emitError(error?: Error) {
    for (const h of this.handlers) {
      h.onError?.(error)
    }
  }

  emitData(data: unknown) {
    for (const h of this.handlers) {
      h.onData?.(data)
    }
  }

  emitLoading(loading?: boolean) {
    for (const h of this.handlers) {
      h.onLoading?.(loading)
    }
  }
}