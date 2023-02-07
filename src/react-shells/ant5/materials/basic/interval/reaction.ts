import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IIntervalConfig extends IConfigMeta {
  interval?: number
}

export class IntervalReaction extends AbstractReaction<IIntervalConfig> {
  timer?: NodeJS.Timer
  constructor(meta: IReactionMeta<IIntervalConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    this.getInputByName("startUp")?.connect(this.startUpHandler)
    this.getInputByName("stop")?.connect(this.stopHandler)
  }

  startUpHandler = () => {
    if (this.meta.config?.interval) {
      this.timer = setInterval(this.outputHandler, this.meta.config?.interval)
    }
  }

  stopHandler = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  outputHandler = () => {
    this.getOutputByName("output")?.push()
  }
}

export const Interval: ReactionFactory = (meta: IReactionMeta<IIntervalConfig>, options?: IReactionFactoryOptions) => {
  return new IntervalReaction(meta, options)
}