import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"
import { IFieldConfig } from "../readFieldValue"

@Activity(ValidateField.NAME)
export class ValidateField extends AbstractActivity<IFieldConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.validateField"
  public static OUTPUT_NAME_FAILURE = "failure"
  public static OUTPUT_NAME_SUCCESS = "success"

  constructor(meta: INodeDefine<IFieldConfig>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(): void {
    const path = this.meta.config?.fieldPath
    if (path) {
      const field = this.context?.form?.getField(path)
      if (field) {
        //@@后面完善fieldy，加校验返回信息
        field.validate()
      }
    }
  }
}
