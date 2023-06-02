import { IQueryParam, IReponseHandler } from "../interfaces";

export enum QueryStatus {
  querying = 1,
  error,
  revalidating,
  complated,
}

export class QueryRecord {
  status?: QueryStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  constructor(private param: IQueryParam, public handlers: IReponseHandler[]) { }

  revalidate() {
    if (this.param.url) {
      this.emitRevalidating(true)
      fetch(this.param.url, this.param.requestInit).then((res: Response) => {
        this.emitRevalidating(false)
        this.emitError(undefined)
        res.json().then((value) => {
          this.emitData(value)
        }).catch(e => {
          this.emitError(e)
        })
      }).catch(e => {
        this.emitError(e)
      })
    }
  }

  load() {
    if (this.param.url) {
      this.emitLoading(true)
      fetch(this.param.url, this.param.requestInit).then((res: Response) => {
        this.emitLoading(false)
        this.emitError(undefined)
        res.json().then((value) => {
          this.emitData(value)
        }).catch(e => {
          this.emitError(e)
        })
      }).catch(e => {
        this.emitError(e)
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