import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

@Activity(ResetFormActivity.NAME)
export class ResetFormActivity extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.resetForm"

  constructor(meta: INodeDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    this.next(this.context?.form?.getValue())
  }
}
