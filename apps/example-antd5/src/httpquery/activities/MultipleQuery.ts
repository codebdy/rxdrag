import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { QuerySession } from "httpquery/lib/classes/QuerySession"
import { IQueryConfig, IQueryParam, IRestfulQuerySession } from "httpquery/lib/interfaces"

@Activity(MultipleQuery.NAME)
export class MultipleQuery extends AbstractActivity<IQueryConfig> {
  public static NAME = "example.MultipleQuery"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_QUERYING = "querying"
  public static OUTPUT_NAME_ERROR = "error"
  public dataQuery?: IRestfulQuerySession;

  constructor(meta: IActivityDefine<IQueryConfig>) {
    super(meta)
    if (meta.config) {
      const dataQuery = new QuerySession(meta.config)
      if (!dataQuery) {
        console.error("Create data source error!")
        this.next(undefined);
        return
      }

      this.dataQuery = dataQuery;
    }
  }

  @Input()
  inputHandler(params: IQueryParam): void {
    this?.dataQuery?.query(params, {
      onData: this.complateHandler,
      onError: this.errorHandler,
      onLoading: this.loadinghandler,
    })
  }

  complateHandler = (data: unknown) => {
    this.next(data, MultipleQuery.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error) => {
    this.next(error, MultipleQuery.OUTPUT_NAME_ERROR)
  }

  loadinghandler = (loading?: boolean) => {
    this.next(loading, MultipleQuery.OUTPUT_NAME_QUERYING)
  }

  destory = () => {
    this.dataQuery?.destory()
  }
}