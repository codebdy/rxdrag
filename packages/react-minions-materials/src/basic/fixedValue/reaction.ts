import { AbstractReaction, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IReactionMeta, ActivityFactory } from "@rxdrag/schema"

export interface IFixedValueConfig extends IConfigMeta {
  value?: any,
}

export class FixedValueReaction extends AbstractReaction<IFixedValueConfig> {

  constructor(meta: IReactionMeta<IFixedValueConfig>, options?: IActivityFactoryOptions) {
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

export const FixedValue: ActivityFactory = (meta: IReactionMeta<IFixedValueConfig>, options?: IActivityFactoryOptions) => {
  return new FixedValueReaction(meta, options)
}