import { Activity, AbstractActivity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { IFieldConfig } from "../readFieldValue"

@Activity(ResetFieldActivity.NAME)
export class ResetFieldActivity extends AbstractActivity<IFieldConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.resetField"

  constructor(meta: INodeDefine<IFieldConfig>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(inputValue: unknown, runContext?: object): void {
    const path = this.meta.config?.fieldPath 
    if(path){
      const field = this.context?.form?.getField(path)
      field?.reset()
    }
    this.next(inputValue, runContext)
  }
}
