import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"

export interface IFixedValueConfig extends IConfigMeta {
  value?: any,
}

export class FixedValueReaction extends AbstractActivity<IFixedValueConfig> {

  constructor(meta: IActivityDefine<IFixedValueConfig>, options?: IActivityFactoryOptions) {
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

export const FixedValue: ActivityFactory = (meta: IActivityDefine<IFixedValueConfig>, options?: IActivityFactoryOptions) => {
  return new FixedValueReaction(meta, options)
}