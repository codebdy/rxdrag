import { AbstractActivity, Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IFieldyLogicFlowContext } from "../context"

export interface ISubscribeFieldConfig {
  fieldPath?: string,
}

@Activity(SubscribeField.NAME)
export class SubscribeField extends AbstractActivity<ISubscribeFieldConfig, IFieldyLogicFlowContext>  {
  public static NAME = "fieldy.subscribeField"
  constructor(meta: INodeDefine<ISubscribeFieldConfig>, context?: IFieldyLogicFlowContext) {
    super(meta, context)
    const path = meta.config?.fieldPath
    if (path) {
      const field = context?.form?.getField(path)
      if (field) {
        field.onValueChange(this.handleValueChange)
      }
    }
  }

  handleValueChange = (value?: unknown) => {
    this.outputValue(value)
  }

  outputValue = (value?: unknown) => {
    this.jointers.getOutput("output")?.push(value)
  }
}
