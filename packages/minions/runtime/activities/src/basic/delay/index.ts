import { AbstractActivity, ActivityFactory } from "@rxdrag/minions"
import { IActivityDefine } from "@rxdrag/minions-schema"

export interface IDelayConfig {
  time?: number
}

export class DelayActivity extends AbstractActivity<IDelayConfig> {
  inputValue?: any
  timeout?: NodeJS.Timeout
  constructor(meta: IActivityDefine<IDelayConfig>) {
    super(meta)

    this.getInputByName("startUp")?.connect(this.startUpHandler)
  }

  startUpHandler = (inputValue?: any) => {
    this.clear()
    this.inputValue = inputValue
    if (this.meta.config?.time) {
      this.timeout = setTimeout(this.outputHandler, this.meta.config?.time)
    }
  }

  outputHandler = () => {
    this.getOutputByName("output")?.push(this.inputValue)
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

export const Delay: ActivityFactory<IDelayConfig> = (meta: IActivityDefine<IDelayConfig>) => {
  return new DelayActivity(meta)
}

export const DelayActivityName = "delay"