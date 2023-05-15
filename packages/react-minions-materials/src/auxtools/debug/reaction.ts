import { IConfigMeta, IReactionMeta, ActivityFactory } from "@rxdrag/schema"
import { AbstractReaction, IActivityFactoryOptions } from "@rxdrag/minions"

export interface IDebugConfig extends IConfigMeta {
  closed?: boolean
}

export class DebugReaction extends AbstractReaction<IDebugConfig> {

  constructor(meta: IReactionMeta<IDebugConfig>, options?: IActivityFactoryOptions) {
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

export const Debug: ActivityFactory = (meta: IReactionMeta<IDebugConfig>, options?: IActivityFactoryOptions) => {
  return new DebugReaction(meta, options)
}