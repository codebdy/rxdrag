import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IIncreaseConfig {
  step?: number
}

@Activity(Increase.NAME)
export class Increase extends AbstractActivity<IIncreaseConfig> {
  public static NAME = "system.increase"

  constructor(meta: INodeDefine<IIncreaseConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: number, runContext?: object) => {
    if (this.meta.config?.step !== undefined && inputValue !== undefined) {
      this.next(inputValue + this.meta.config?.step, runContext)
    }
  }
}
