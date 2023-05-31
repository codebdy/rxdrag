import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

@Activity(ReadFormValueActivity.NAME)
export class ReadFormValueActivity extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.readFormValue"

  constructor(meta: IActivityDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    this.next(this.context?.form?.value)
  }
}
