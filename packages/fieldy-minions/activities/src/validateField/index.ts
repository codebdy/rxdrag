import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { IFieldValueConfig } from "../readFieldValue"

@Activity(ValidateFieldValue.NAME)
export class ValidateFieldValue extends AbstractActivity<IFieldValueConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.validateFieldValue"

  constructor(meta: IActivityDefine<IFieldValueConfig>, context: IFieldyLogicFlowContext) {
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
