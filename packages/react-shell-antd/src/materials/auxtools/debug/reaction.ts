import { IConfigMeta, IReactionMeta, ReactionFactory } from "@rxdrag/schema"
import { AbstractReaction, IReactionFactoryOptions } from "@rxdrag/minions"

export interface IDebugConfig extends IConfigMeta {
  closed?: boolean
}

export class DebugReaction extends AbstractReaction<IDebugConfig> {

  constructor(meta: IReactionMeta<IDebugConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    if (!this.meta.config?.closed) {
      console.log(`🪲${this.meta.label || "Debug"}:`, inputValue)
    }
  }
}

export const Debug: ReactionFactory = (meta: IReactionMeta<IDebugConfig>, options?: IReactionFactoryOptions) => {
  return new DebugReaction(meta, options)
}