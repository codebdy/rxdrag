import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { IFieldConfig } from "../readFieldValue"

@Activity(SetFieldValue.NAME)
export class SetFieldValue extends AbstractActivity<IFieldConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.setFieldValue"

  constructor(meta: IActivityDefine<IFieldConfig>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(value: unknown): void {
    const path = this.meta.config?.fieldPath
    if (path) {
      const field = this.context?.form?.getField(path)
      if (field) {
        field.setValue(value)
      }
    }
  }
}
