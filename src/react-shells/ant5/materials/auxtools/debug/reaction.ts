import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/reaction";
import { IReactionFactoryOptions, ReactionFactory } from "runner/reaction/interfaces/controller";

export class DebugReaction extends AbstractReaction<IConfigMeta> {

  constructor(meta: IReactionMeta<IConfigMeta>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Debug inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue: string) => {
    console.log(`🪲${this.meta.label || "Debug"}:`, inputValue)
  }
}

export const Debug: ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options?: IReactionFactoryOptions) => {
  return new DebugReaction(meta, options)
}