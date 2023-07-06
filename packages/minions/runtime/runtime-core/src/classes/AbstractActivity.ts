import { IActivityDefine } from "@rxdrag/minions-schema";
import { IActivity, IActivityJointers } from "../interfaces/activity";
import { ActivityJointers } from "./ActivityJointer";

export abstract class AbstractActivity<ConfigMeta = unknown, LogicFlowContext = unknown> implements IActivity {
  id: string;
  jointers: IActivityJointers;
  config?: ConfigMeta;
  constructor(public meta: IActivityDefine<ConfigMeta>, public context?: LogicFlowContext) {
    this.id = meta.id
    this.jointers = new ActivityJointers()
    this.config = meta.config;
  }
  destory = () => {
    //
  }

  next = (inputValue: unknown, outputName = "output") => {
    this.jointers.getOutput(outputName)?.push(inputValue)
  }
}