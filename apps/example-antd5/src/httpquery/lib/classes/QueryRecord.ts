import { IQueryParam, IReponseHandler } from "../interfaces";
import _ from "lodash"
import axios from 'axios';

export enum QueryStatus {
  querying = 1,
  error,
  revalidating,
  complated,
}

const PREDEFINED_HEADERS = {
  "Accept": "application/json",
  'Content-Type': 'application/json'
}

export class QueryRecord {
  status?: QueryStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  constructor(private param: IQueryParam, public handlers: IReponseHandler[]) { }

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