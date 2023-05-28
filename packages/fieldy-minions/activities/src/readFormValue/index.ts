import { activity, SingleInputActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

export const ReadFormValueActivityName = "fieldy.readFormValue"

@activity(ReadFormValueActivityName)
export class ReadFormValueActivity extends SingleInputActivity<unknown, IFieldyLogicFlowContext> {
  constructor(meta: IActivityDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  execute(): void {
    this.next(this.context?.form?.value)
  }
}
