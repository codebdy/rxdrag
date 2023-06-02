import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { GlobalQuery } from "httpquery/lib/classes/RestfulQuery"
import { DataSouceFactory } from "httpquery/lib/classes/factory"
import { IQueryConfig, IRestfulDataSource } from "httpquery/lib/interfaces"

@Activity(RestfulQuery.NAME)
export class RestfulQuery extends AbstractActivity<IQueryConfig> {
  public static NAME = "example.DataQuery"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_QUERYING = "querying"
  public static OUTPUT_NAME_ERROR = "error"
  public dataSouce?: IRestfulDataSource;

  constructor(meta: IActivityDefine<IQueryConfig>) {
    super(meta)
  }

  @Input()
  inputHandler(params: unknown): void {
    if (!this.meta.config) {
      this.next(undefined);
      return
    }
    const dataSouce = DataSouceFactory(this.meta.config)
    if (!dataSouce) {
      console.error("Create data source error!")
      this.next(undefined);
      return
    }
    dataSouce?.init(params)
    this.dataSouce = dataSouce;
    GlobalQuery.subscribeQuery(dataSouce, {
      onComplate: this.complateHandler,
      onError: this.errorHandler,
      onLoading: this.loadinghandler,
    })
  }

  complateHandler = (data: unknown) => {
    this.next(data, RestfulQuery.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error) => {
    this.next(error, RestfulQuery.OUTPUT_NAME_ERROR)
  }

  loadinghandler = (loading?: boolean) => {
    this.next(loading, RestfulQuery.OUTPUT_NAME_QUERYING)
  }

  destory = () => {
    const url = this.dataSouce?.toUrl()
    url && GlobalQuery.unsubscribeQuery(url)
  }
}