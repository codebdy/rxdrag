import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityQueryConfig } from "../common/IEntityQueryConfig"


@Activity(QueryOneEntity.NAME)
export class QueryOneEntity extends AbstractActivity<IEntityQueryConfig> {
  public static NAME = "query-one-entity"
  public static INPUT_NAME_CONDITION_PARAMS = "condition_params"
  public static OUTPUT_ENTITY = "entity"
  public static OUTPUT_SUCCESS = "success"
  public static OUTPUT_FAILURE = "failure"
  public static OUTPUT_LOADING = "loading"

  constructor(meta: INodeDefine<IEntityQueryConfig>) {
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
