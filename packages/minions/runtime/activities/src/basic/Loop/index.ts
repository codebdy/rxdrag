import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import _ from "lodash"

export interface ILoopConfig {
  fromInput?: boolean,
  times?: number
}

@Activity(Loop.NAME)
export class Loop extends AbstractActivity<ILoopConfig> {
  public static NAME = "system.loop"
  public static PORT_OUTPUT = "output"
  public static PORT_FINISHED = "finished"

  constructor(meta: IActivityDefine<ILoopConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: unknown) => {
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

  output = (value: unknown) => {
    this.next(value)
  }
}
