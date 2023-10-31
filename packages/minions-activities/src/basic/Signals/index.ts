import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IIntervalConfig {
  interval?: number
}

@Activity(Signals.NAME)
export class Signals extends AbstractActivity<IIntervalConfig> {
  public static NAME = "system.signals"
  public static INPUT_NAME_STARTUP = "startUp"
  public static INPUT_NAME_STOP = "stop"
  public static INPUT_NAME_INTERVAL = "interval"

  timer?: NodeJS.Timer
  inputValue?: unknown
  interval?: number
  constructor(meta: INodeDefine<IIntervalConfig>) {
    super(meta)
  }

  @Input(Signals.INPUT_NAME_STARTUP)
  startUpHandler = (inputValue?: unknown, runContext?: object) => {
    this.stopHandler()
    this.inputValue = inputValue
    const interval = this.interval || this.meta.config?.interval
    if (interval) {
      this.timer = setInterval(() => this.handleOutput(runContext), interval)
      console.log("启动定时器", this.timer, interval)
    }
  }

  @Input(Signals.INPUT_NAME_STOP)
  stopHandler = () => {
    if (this.timer) {
      console.log("停止定时器", this.timer)
      clearInterval(this.timer)
      this.timer = undefined
    }
  }


  @Input(Signals.INPUT_NAME_INTERVAL)
  intervalHandler = (interval?: number) => {
    this.interval = interval
  }

  handleOutput = (runContext?: object) => {
    this.next(this.inputValue, runContext)
  }

  destroy = () => {
    console.log("定时器销毁", this.timer)
    this.stopHandler()
  }
}