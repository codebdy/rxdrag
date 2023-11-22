import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IEntityConfig } from "../common/IEntityConfig"
import { EntityFetcher } from "../../../data/EntityFetcher"

@Activity(SaveEntity.NAME)
export class SaveEntity extends AbstractActivity<IEntityConfig> {
  public static NAME = "save-entity"
  public static OUTPUT_ENTITY = "entity"
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
    this.next(true, runContext, SaveEntity.OUTPUT_LOADING)
    this.fetcher.saveOne(inputValue).then((data) => {
      this.next(data, runContext, SaveEntity.OUTPUT_ENTITY)
      this.next("success", runContext, SaveEntity.OUTPUT_SUCCESS)
    }).catch((err) => {
      this.next(err, runContext, SaveEntity.OUTPUT_FAILURE)
    }).finally(() => {
      this.next(false, runContext, SaveEntity.OUTPUT_LOADING)
    })
  }

  destroy = () => {
    this.fetcher.destory()
    super.destroy()
  }
}
