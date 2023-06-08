import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

@Activity(ReadFormValue.NAME)
export class ReadFormValue extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.readFormValue"

  constructor(meta: IActivityDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    this.next(this.context?.form?.getValue())
  }
}
