import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { FormValue } from "@rxdrag/fieldy"

@Activity(SetFormValue.NAME)
export class SetFormValue extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.setFormValue"

  constructor(meta: INodeDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(value: unknown): void {
    this.context?.form?.setValue(value as FormValue);
  }
}
