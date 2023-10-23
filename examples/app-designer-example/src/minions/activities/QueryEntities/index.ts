import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IQueryEntitiesConfig {
  entityId?: string,
  noQueryOnInit?: boolean,
  queryOnFocus?: boolean,
  pollingTime?: number,
  queryParams?: unknown,
}

@Activity(QueryEntities.NAME)
export class QueryEntities extends AbstractActivity<IQueryEntitiesConfig> {
  public static NAME = "qurey-entities"
  public static INPUT_NAME_CONDITION = "condition"
  public static INPUT_NAME_PAGE = "page"
  public static INPUT_PAGE_SIZE = "page_size"
  public static OUTPUT_DATA = "data"
  public static OUTPUT_SUCCESS = "success"

  constructor(meta: INodeDefine<IQueryEntitiesConfig>,) {
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
