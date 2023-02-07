import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export interface IRandomConfig extends IConfigMeta {
  maxValue?: number,
  minValue?: number,
}

export class RandomReaction extends AbstractReaction<IRandomConfig> {

  constructor(meta: IReactionMeta<IRandomConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }

    this.getInputByName("startUp")?.connect(this.startUpHandler)
    this.getInputByName("stop")?.connect(this.stopHandler)
  }

  startUpHandler = () => {
    // if (this.meta.config?.interval) {
    //   this.timer = setInterval(this.outputHandler, this.meta.config?.interval)
    // }
  }

  stopHandler = () => {
    // if (this.timer) {
    //   clearInterval(this.timer)
    //   this.timer = undefined
    // }
  }

  outputHandler = () => {
    this.getOutputByName("output")?.push()
  }
}

export const Random: ReactionFactory = (meta: IReactionMeta<IRandomConfig>, options?: IReactionFactoryOptions) => {
  return new RandomReaction(meta, options)
}