import { AbstractActivity, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine, ActivityFactory } from "@rxdrag/schema"
import { isArr, isNum } from "@rxdrag/shared"

export interface ILoopConfig extends IConfigMeta {
  fromInput?: boolean,
  times?: number
}

export class LoopReaction extends AbstractActivity<ILoopConfig> {
  constructor(meta: IActivityDefine<ILoopConfig>, options?: IActivityFactoryOptions) {
    super(meta, options)

    this.getInputByName("input")?.connect(this.inputHandler)
  }

  inputHandler = (inputValue?: any) => {
    if (this.meta.config?.fromInput) {
      if (!isArr(inputValue)) {
        console.error("Loop input is not array")
      } else {
        for (const one of inputValue) {
          this.output(one)
        }
      }
    } else if (isNum(this.meta.config?.times)) {
      for (let i = 0; i < (this.meta.config?.times || 0); i++) {
        this.output(i)
      }
    }
  }

  output = (value: any) => {
    this.getOutputByName("output")?.push(value)
  }
}

export const Loop: ActivityFactory = (meta: IActivityDefine<ILoopConfig>, options?: IActivityFactoryOptions) => {
  return new LoopReaction(meta, options)
}