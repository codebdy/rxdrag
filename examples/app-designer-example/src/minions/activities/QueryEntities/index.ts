import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityQueryConfig } from "../common/IEntityQueryConfig"

@Activity(QueryEntities.NAME)
export class QueryEntities extends AbstractActivity<IEntityQueryConfig> {
  public static NAME = "qurey-entities"
  public static INPUT_NAME_CONDITION_PARAMS = "condition_params"
  public static INPUT_NAME_PAGE = "page"
  public static INPUT_PAGE_SIZE = "page_size"
  public static INPUT_SORT = "sort"
  public static OUTPUT_LIST = "list"
  public static OUTPUT_TOTAL = "total"
  public static OUTPUT_SUCCESS = "success"
  public static OUTPUT_FAILURE = "failure"
  public static OUTPUT_LOADING = "loading"

  constructor(meta: INodeDefine<IEntityQueryConfig>,) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: unknown, runContext?: object) => {
    const portLoading = "loading"
    // this.next(true, runContext, portLoading)
    // if (this.meta.config?.isError) {
    //   setTimeout(() => {
    //     this.next(false, runContext, portLoading)
    //     this.next("Read data error", runContext, "error")
    //   }, this.meta.config.duration)
    // } else {
    //   setTimeout(() => {
    //     this.next(false, runContext, portLoading)
    //     this.next(inputValue, runContext, "success")
    //   }, this.meta.config?.duration)
    // }
  }
}
