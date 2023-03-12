import { isArr, isNum } from "core/utils/types";
import { AbstractReaction, IConfigMeta, IReactionMeta } from "runner/minions";
import { IReactionFactoryOptions, ReactionFactory } from "runner/minions/interfaces/controller";

export interface ILoopConfig extends IConfigMeta {
  fromInput?: boolean,
  times?: number
}

export class LoopReaction extends AbstractReaction<ILoopConfig> {
  constructor(meta: IReactionMeta<ILoopConfig>, options?: IReactionFactoryOptions) {
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

export const Loop: ReactionFactory = (meta: IReactionMeta<ILoopConfig>, options?: IReactionFactoryOptions) => {
  return new LoopReaction(meta, options)
}