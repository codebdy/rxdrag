import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IDelayConfig {
  time?: number
}

@Activity(Delay.NAME)
export class Delay extends AbstractActivity<IDelayConfig> {
  public static NAME = "system.delay"
  inputValue?: any
  timeout?: NodeJS.Timeout
  constructor(meta: INodeDefine<IDelayConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any) => {
    this.clear()
    this.inputValue = inputValue
    if (this.meta.config?.time) {
      this.timeout = setTimeout(this.outputHandler, this.meta.config?.time)
    }
  }

  outputHandler = () => {
    this.next(this.inputValue)
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
