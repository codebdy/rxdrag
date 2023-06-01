import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { IFieldConfig } from "../readFieldValue"

@Activity(ValidateField.NAME)
export class ValidateField extends AbstractActivity<IFieldConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.validateField"

  constructor(meta: IActivityDefine<IFieldConfig>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    const path = this.meta.config?.fieldPath
    if (path) {
      const field = this.context?.form?.getField(path)
      if (field) {
        field.validate()
      }
    }
  }
}
