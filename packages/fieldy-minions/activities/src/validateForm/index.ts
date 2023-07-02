import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

@Activity(ValidateForm.NAME)
export class ValidateForm extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.validateFormValue"
  public static OUTPUT_NAME_FAILURE = "failure"
  public static OUTPUT_NAME_SUCCESS = "success"
  
  constructor(meta: IActivityDefine<unknown>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    this.context?.form?.validate();
  }
}
