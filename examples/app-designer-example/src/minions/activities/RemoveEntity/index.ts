import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityConfig } from "../common/IEntityConfig"
import { EntityFetcher } from "../../../data/EntityFetcher"

// export interface ISaveEntityConfig extends IEntityConfig {

// }

@Activity(RemoveEntity.NAME)
export class RemoveEntity extends AbstractActivity<IEntityConfig> {
  public static NAME = "remove-entity"
  public static OUTPUT_SUCCESS = "success"
  public static OUTPUT_FAILURE = "failure"
  public static OUTPUT_LOADING = "loading"
  private fetcher: EntityFetcher

  constructor(meta: INodeDefine<IEntityConfig>) {
    super(meta)
    this.fetcher = new EntityFetcher(this.config?.entityId)
  }

  @Input()
  inputHandler = (inputValue?: unknown, runContext?: object) => {
    this.next(true, runContext, RemoveEntity.OUTPUT_LOADING)
    this.fetcher.remove(inputValue).then(() => {
      this.next("success", runContext, RemoveEntity.OUTPUT_SUCCESS)
    }).catch((err) => {
      this.next(err, runContext, RemoveEntity.OUTPUT_FAILURE)
    }).finally(() => {
      this.next(false, runContext, RemoveEntity.OUTPUT_LOADING)
    })
  }
}
