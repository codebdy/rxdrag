import { Activity, Input, AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IFieldyLogicFlowContext } from "../context"

export interface IFieldConfig {
  fieldPath?: string,
}

@Activity(ReadFieldValue.NAME)
export class ReadFieldValue extends AbstractActivity<IFieldConfig, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.readFieldValue"

  constructor(meta: INodeDefine<IFieldConfig>, context: IFieldyLogicFlowContext) {
    super(meta, context)
  }

  @Input()
  inputHandler(value?: unknown, runContext?: object): void {
    const path = this.meta.config?.fieldPath
    if (path) {
      const field = this.context?.form?.getField(path)
      if (field) {
        this.next(field.getValue(), runContext)
      }
    }
  }
}
