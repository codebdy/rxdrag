import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IDelayConfig {
  time?: number
}

@Activity(Delay.NAME)
export class Delay extends AbstractActivity<IDelayConfig> {
  public static NAME = "system.delay"
  timeout?: NodeJS.Timeout
  constructor(meta: INodeDefine<IDelayConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: unknown, runContext?: object) => {
    this.clear()
    if (this.meta.config?.time) {
      this.timeout = setTimeout(() => this.outputHandler(inputValue, runContext), this.meta.config?.time)
    }
  }

  outputHandler = (inputValue?: unknown, runContext?: object) => {
    this.next(inputValue, runContext)
  }

  clear = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }

  destroy = () => {
    this.clear()
  }
}
