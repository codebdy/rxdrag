import { Activity, MultipleInputActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"

export const SignalsName = "system.signals"

export interface IIntervalConfig {
  interval?: number
}

@Activity(SignalsName)
export class Signals extends MultipleInputActivity<IIntervalConfig> {
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