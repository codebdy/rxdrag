import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"

export interface IDelayConfig extends IConfigMeta {
  time?: number
}

export class DelayReaction extends AbstractActivity<IDelayConfig> {
  inputValue?: any
  timeout?: NodeJS.Timeout
  constructor(meta: IActivityDefine<IDelayConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

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

export const Delay: ActivityFactory = (meta: IActivityDefine<IDelayConfig>, options?: IActivityFactoryOptions) => {
  return new DelayReaction(meta, options)
}