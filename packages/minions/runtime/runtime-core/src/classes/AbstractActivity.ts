import { INodeDefine } from "@rxdrag/minions-schema";
import { IActivity, IActivityJointers } from "../interfaces/activity";
import { ActivityJointers } from "./ActivityJointer";

export abstract class AbstractActivity<ConfigMeta = unknown, LogicFlowContext = unknown> implements IActivity {
  id: string;
  jointers: IActivityJointers;
  config?: ConfigMeta;
  constructor(public meta: INodeDefine<ConfigMeta>, public context?: LogicFlowContext) {
    this.id = meta.id
    this.jointers = new ActivityJointers()
    this.config = meta.config;
  }
  destroy = () => {
    //
  }

  next = (inputValue: unknown, outputName = "output") => {
    const input = this.jointers.inputs[0];
    const runContext = input?.runContext || {};
    // 存在在多个输入时，合并上下文
    if (this.jointers.inputs.length > 1) {
      this.jointers.inputs.slice(1).forEach(item => {
        Object.assign(runContext, item.runContext);
      });
    }
    this.jointers.getOutput(outputName)?.push(inputValue, runContext)
  }
}