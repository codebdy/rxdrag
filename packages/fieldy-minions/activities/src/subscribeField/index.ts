import { activity, IActivity, IActivityJointers } from "@rxdrag/minions-runtime";
import { ActivityJointers } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { IFieldyLogicFlowContext } from "../context"

export const ReadSubscribeFieldActivityName = "fieldy.subscribeField"

export interface ISubscribeFieldConfig {
  fieldPath?: string,
}

//这个代码看出，AbstractActivity结构并不合理，抽时间重构
@activity(ReadSubscribeFieldActivityName)
export class SubscribeFieldActivity implements IActivity {
  id: string;
  jointers: IActivityJointers;
  config?: ISubscribeFieldConfig;

  constructor(meta: IActivityDefine<ISubscribeFieldConfig>, context?: IFieldyLogicFlowContext) {
    this.id = meta.id
    this.jointers = new ActivityJointers()
    this.config = meta.config;
    const path = meta.config?.fieldPath
    if (path) {
      const field = context?.form?.getField(path)
      if (field) {
        field.onValueChange(this.handleValueChange)
      }
    }
  }
  destory(): void {
    //throw new Error("Method not implemented.");
  }

  handleValueChange = (value?: unknown) => {
    this.outputValue(value)
  }

  outputValue = (value?: unknown) => {
    this.jointers.getOutput("output")?.push(value)
  }
}
