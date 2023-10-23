import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityConfig } from "../common/IEntityConfig"

// export interface ISaveEntityConfig extends IEntityConfig {

// }

@Activity(SaveEntity.NAME)
export class SaveEntity extends AbstractActivity<IEntityConfig> {
  public static NAME = "save-entity"
  public static OUTPUT_ENTITY = "entity"
  public static OUTPUT_SUCCESS = "success"
  public static OUTPUT_FAILURE = "failure"
  public static OUTPUT_LOADING = "loading"

  constructor(meta: INodeDefine<IEntityConfig>) {
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
