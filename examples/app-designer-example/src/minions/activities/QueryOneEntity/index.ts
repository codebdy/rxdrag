import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IQueryOneEntityConfig {
  data?: unknown,
}

@Activity(QueryOneEntity.NAME)
export class QueryOneEntity extends AbstractActivity<IQueryOneEntityConfig> {
  public static NAME = "system.mock"

  constructor(meta: INodeDefine<IQueryOneEntityConfig>) {
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
