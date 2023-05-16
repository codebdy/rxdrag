import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"


export interface IIntervalConfig extends IConfigMeta {
  interval?: number
}

export class IntervalReaction extends AbstractActivity<IIntervalConfig> {
  timer?: NodeJS.Timer
  inputValue?: any
  constructor(meta: IActivityDefine<IIntervalConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    this.getInputByName("startUp")?.connect(this.startUpHandler)
    this.getInputByName("stop")?.connect(this.stopHandler)
  }

  startUpHandler = (inputValue?: any) => {
    this.stopHandler()
    this.inputValue = inputValue
    if (this.meta.config?.interval) {
      this.timer = setInterval(this.handleOutput, this.meta.config?.interval)
    }
  }

  stopHandler = () => {
    console.log("定时器销毁", this.timer)
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  handleOutput = () => {
    this.getOutputByName("output")?.push(this.inputValue)
  }

  destory = ()=> {
     this.stopHandler()
  }
}

export const Interval: ActivityFactory = (meta: IActivityDefine<IIntervalConfig>, options?: IActivityFactoryOptions) => {
  return new IntervalReaction(meta, options)
}