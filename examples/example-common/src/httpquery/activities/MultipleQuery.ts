import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IQueryConfig, IRestfulQuerySession } from "../lib"
import { QuerySession } from "../lib/classes/QuerySession"


@Activity(MultipleQuery.NAME)
export class MultipleQuery extends AbstractActivity<IQueryConfig> {
  public static NAME = "example.MultipleQuery"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_QUERYING = "querying"
  public static OUTPUT_NAME_ERROR = "error"
  public querySession?: IRestfulQuerySession;

  constructor(meta: INodeDefine<IQueryConfig>) {
    super(meta)
    if (meta.config) {
      const dataQuery = new QuerySession(meta.config)
      if (!dataQuery) {
        console.error("Create data source error!")
        this.next(undefined);
        return
      }

      this.querySession = dataQuery;
    }
  }

  @Input()
  inputHandler(urlParam: string, runContext?: object): void {
    //@@ 最好能添加防抖处理，把一段小段时间间隔内的请求，合并为一个请求，使用最后的参数查询
    this?.querySession?.query(urlParam, {
      onData: (data: unknown) => this.complateHandler(data, runContext),
      onError: (error?: Error) => this.errorHandler(error, runContext),
      onLoading: (loading?: boolean) => this.loadingHandler(loading, runContext),
    })
  }

  complateHandler = (data: unknown, runContext?: object) => {
    this.next(data, runContext, MultipleQuery.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error, runContext?: object) => {
    this.next(error, runContext, MultipleQuery.OUTPUT_NAME_ERROR)
  }

  loadingHandler = (loading?: boolean, runContext?: object) => {
    this.next(loading, runContext, MultipleQuery.OUTPUT_NAME_QUERYING)
  }

  destroy = () => {
    this.querySession?.destroy()
  }
}