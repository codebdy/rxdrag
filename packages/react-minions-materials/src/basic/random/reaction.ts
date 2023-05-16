import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"

export interface IRandomConfig extends IConfigMeta {
  maxValue?: number,
  minValue?: number,
}

export class RandomReaction extends AbstractActivity<IRandomConfig> {

  constructor(meta: IActivityDefine<IRandomConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    if (Object.keys(meta.inPorts || {}).length !== 1) {
      throw new Error("Condition inputs count error")
    }

    this.getInputByName("startUp")?.connect(this.startUpHandler)
  }

  startUpHandler = () => {
    const min = this.meta.config?.minValue || 0
    const max = (this.meta.config?.maxValue || 1) + 1
    this.getOutputByName("output")?.push(this.getRandomInteger(min, max))
  }
  private getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export const Random: ActivityFactory = (meta: IActivityDefine<IRandomConfig>, options?: IActivityFactoryOptions) => {
  return new RandomReaction(meta, options)
}