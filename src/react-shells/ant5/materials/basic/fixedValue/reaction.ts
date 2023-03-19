import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

export interface IFixedValueConfig extends IConfigMeta {
  value?: any,
}

export class FixedValueReaction extends AbstractReaction<IFixedValueConfig> {

  constructor(meta: IReactionMeta<IFixedValueConfig>, options?: IReactionFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Fixed value inputs count error")
    }

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = () => {
    this.getOutputByName("output")?.push(this.meta.config?.value)
  }
}

export const FixedValue: ReactionFactory = (meta: IReactionMeta<IFixedValueConfig>, options?: IReactionFactoryOptions) => {
  return new FixedValueReaction(meta, options)
}