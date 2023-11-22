import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IPostConfig, IRestfulQuerySession } from "../lib"
import { GlobalRestful } from "../lib/classes/Restful"


@Activity(PostData.NAME)
export class PostData extends AbstractActivity<IPostConfig> {
  public static NAME = "example.PostData"
  public static OUTPUT_NAME_DATA = "dataOut"
  public static OUTPUT_NAME_POSTING = "posting"
  public static OUTPUT_NAME_ERROR = "error"
  public querySession?: IRestfulQuerySession;

  constructor(meta: INodeDefine<IPostConfig>) {
    super(meta)
  }

  @Input()
  inputHandler(data: unknown, runContext?: object): void {
    GlobalRestful?.save({ ...this.config, url: this.config?.rootUrl, data }, {
      onData: (data: unknown) => this.complateHandler(data, runContext),
      onError: (error?: Error) => this.errorHandler(error, runContext),
      onLoading: (loading?: boolean) => this.loadingHandler(loading, runContext),
    })
  }

  complateHandler = (data: unknown, runContext?: object) => {
    this.next(data, runContext, PostData.OUTPUT_NAME_DATA)
  }

  errorHandler = (error?: Error, runContext?: object) => {
    this.next(error, runContext, PostData.OUTPUT_NAME_ERROR)
  }

  loadingHandler = (loading?: boolean, runContext?: object) => {
    this.next(loading, runContext, PostData.OUTPUT_NAME_POSTING)
  }

  destroy = () => {
    this.querySession?.destroy()
  }
}