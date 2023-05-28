import { SingleInputActivity, Activity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import _ from "lodash"

export const LoopActivityName = "system.loop"

export interface ILoopConfig {
  fromInput?: boolean,
  times?: number
}

@Activity(LoopActivityName)
export class Loop extends SingleInputActivity<ILoopConfig> {
  constructor(meta: IActivityDefine<ILoopConfig>) {
    super(meta)
  }

  execute = (inputValue?: any) => {
    if (this.meta.config?.fromInput) {
      if (!_.isArray(inputValue)) {
        console.error("Loop input is not array")
      } else {
        for (const one of inputValue) {
          this.output(one)
        }
      }
    } else if (_.isNumber(this.meta.config?.times)) {
      for (let i = 0; i < (this.meta.config?.times || 0); i++) {
        this.output(i)
      }
    }
  }

  output = (value: any) => {
    this.next(value)
  }
}
