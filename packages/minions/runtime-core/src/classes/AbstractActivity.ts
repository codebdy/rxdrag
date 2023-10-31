import { INodeDefine } from "@rxdrag/minions-schema";
import { IActivity, IActivityJointers } from "../interfaces/activity";
import { ActivityJointers } from "./ActivityJointers";

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

  next = (inputValue: unknown, runContext?: object, outputName = "output") => {
    this.jointers.getOutput(outputName)?.push(inputValue, runContext)
  }
}