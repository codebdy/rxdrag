import { SingleInputActivity, Activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const DelayActivityName = "system.delay"

export interface IDelayConfig {
  time?: number
}

@Activity(DelayActivityName)
export class Delay extends SingleInputActivity<IDelayConfig> {
  inputValue?: any
  timeout?: NodeJS.Timeout
  constructor(meta: IActivityDefine<IDelayConfig>) {
    super(meta)
  }

  execute = (inputValue?: any) => {
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

  destory = () => {
    this.clear()
  }
}
