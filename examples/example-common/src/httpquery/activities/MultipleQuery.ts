import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { QuerySession } from "httpquery/lib/classes/QuerySession"
import { IQueryConfig, IRestfulQuerySession } from "httpquery/lib/interfaces"

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
  inputHandler(urlParam: string): void {
    //@@ 最好能添加防抖处理，把一段小段时间间隔内的请求，合并为一个请求，使用最后的参数查询
    this?.querySession?.query(urlParam, {
      onData: this.complateHandler,
      onError: this.errorHandler,
      onLoading: this.loadingHandler,
    })
  }

  complateHandler = (data: unknown) => {
    this.next(data, MultipleQuery.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error) => {
    this.next(error, MultipleQuery.OUTPUT_NAME_ERROR)
  }

  loadingHandler = (loading?: boolean) => {
    this.next(loading, MultipleQuery.OUTPUT_NAME_QUERYING)
  }

  destroy = () => {
    this.querySession?.destroy()
  }
}