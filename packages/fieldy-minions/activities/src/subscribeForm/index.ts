import { Activity, IActivity, IActivityJointers } from "@rxdrag/minions-runtime";
import { ActivityJointers } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
import { IFieldyLogicFlowContext } from "../context"

export const ReadSubscribeFormActivityName = "fieldy.subscribeForm"

//这个代码看出，AbstractActivity结构并不合理，抽时间重构
@Activity(ReadSubscribeFormActivityName)
export class SubscribeFormActivity implements IActivity {
  id: string;
  jointers: IActivityJointers;

  constructor(meta: IActivityDefine<unknown>, context?: IFieldyLogicFlowContext) {
    this.id = meta.id
    this.jointers = new ActivityJointers()
    context?.form?.onValueChange(this.handleValueChange);
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
