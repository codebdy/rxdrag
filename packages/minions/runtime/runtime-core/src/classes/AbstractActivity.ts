import { IActivityDefine } from "@rxdrag/minions-schema";
import { IActivity, IActivityJointers } from "../interfaces/activity";
import { ActivityJointers } from "./ActivityJointer";

export abstract class AbstractActivity<ConfigMeta = unknown, FactoryOptions = unknown> implements IActivity {
  id: string;
  jointers: IActivityJointers;
  config?: ConfigMeta;
  constructor(public meta: IActivityDefine<ConfigMeta>, public options?: FactoryOptions) {
    this.id = meta.id
    this.jointers = new ActivityJointers()
    this.config = meta.config;
  }
  destory = () => {
  }

  abstract connect(): void

  next = (inputValue: unknown, outputName: string = "output") => {
    this.jointers.getInput(outputName)?.push(inputValue)
  }
}