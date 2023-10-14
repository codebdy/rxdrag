import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
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

  constructor(meta: INodeDefine<ILoopConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: unknown, runContext?: object) => {
    let count = 0
    if (this.meta.config?.fromInput) {
      if (!_.isArray(inputValue)) {
        console.error("Loop input is not array")
      } else {
        for (const one of inputValue) {
          this.output(one, runContext)
          count++
        }
      }
    } else if (_.isNumber(this.meta.config?.times)) {
      for (let i = 0; i < (this.meta.config?.times || 0); i++) {
        this.output(i, runContext)
        count++
      }
    }
    //输出循环次数
    this.next(count, runContext, Loop.PORT_FINISHED)
  }

  output = (value: unknown, runContext?: object) => {
    this.next(value, runContext, Loop.PORT_OUTPUT)
  }
}
