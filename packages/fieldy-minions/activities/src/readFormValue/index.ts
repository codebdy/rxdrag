import { activity, SingleInputActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyContext } from "../context"

export const ReadFormValueActivityName = "fieldy.readFormValue"

@activity(ReadFormValueActivityName)
export class ReadFormValueActivity extends SingleInputActivity<unknown, IFieldyContext> {
  constructor(meta: IActivityDefine<unknown>, context: IFieldyContext) {
    super(meta, context)
  }

  execute(): void {
    this.next(this.context?.form?.value)
  }
}
