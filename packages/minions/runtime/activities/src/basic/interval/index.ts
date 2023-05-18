import { activity, MultipleInputActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const IntervalActivityName = "system.interval"

export interface IIntervalConfig {
  interval?: number
}

@activity(IntervalActivityName)
export class Interval extends MultipleInputActivity<IIntervalConfig> {
  timer?: NodeJS.Timer
  inputValue?: any
  constructor(meta: IActivityDefine<IIntervalConfig>) {
    super(meta)

    this.registerHandler("startUp", this.startUpHandler);
    this.registerHandler("stop", this.stopHandler);
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
    this.next(this.inputValue)
  }

  destory = () => {
    this.stopHandler()
  }
}