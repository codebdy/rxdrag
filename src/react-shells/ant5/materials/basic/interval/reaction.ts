import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

export interface IIntervalConfig extends IConfigMeta {
  interval?: number
}

export class IntervalReaction extends AbstractReaction<IIntervalConfig> {
  timer?: NodeJS.Timer
  inputValue?: any
  constructor(meta: IReactionMeta<IIntervalConfig>, options?: IReactionFactoryOptions) {
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

export const Interval: ReactionFactory = (meta: IReactionMeta<IIntervalConfig>, options?: IReactionFactoryOptions) => {
  return new IntervalReaction(meta, options)
}