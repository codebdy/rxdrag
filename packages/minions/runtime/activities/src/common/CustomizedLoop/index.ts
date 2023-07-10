import { AbstractActivity, Activity, Input, LogicFlow } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import _ from "lodash"

export interface IcustomizedLoopConifg {
  fromInput?: boolean,
  times?: number
}

@Activity(CustomizedLoop.NAME)
export class CustomizedLoop extends AbstractActivity<IcustomizedLoopConifg> {
  public static NAME = "system.customizedLoop"
  public static PORT_OUTPUT = "output"
  public static PORT_FINISHED = "finished"
  logicFlow?: LogicFlow;

  constructor(meta: IActivityDefine<IcustomizedLoopConifg>) {
    super(meta)
    if (meta.children) {
      //通过portId关联子流程的开始跟结束节点，端口号对应节点号
      this.logicFlow = new LogicFlow({ ...meta.children, id: meta.id }, undefined)
    } else {
      throw new Error("No implement on CustomizedLoop meta")
    }
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
    this.next(inputValue, CustomizedLoop.PORT_FINISHED)
  }

  output = (value: unknown) => {
    this.next(value, CustomizedLoop.PORT_OUTPUT)
  }
}