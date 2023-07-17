import { AbstractActivity, Activity } from "@rxdrag/minions-runtime";
import { INodeDefine } from "@rxdrag/minions-schema";
import { IFieldyLogicFlowContext } from "../context"


@Activity(SubscribeForm.NAME)
export class SubscribeForm extends AbstractActivity<unknown, IFieldyLogicFlowContext> {
  public static NAME = "fieldy.subscribeForm"

  constructor(meta: INodeDefine<unknown>, context?: IFieldyLogicFlowContext) {
    super(meta, context)
    context?.form?.onValueChange(this.handleValueChange);
  }

  handleValueChange = (value?: unknown) => {
    this.outputValue(value)
  }

  outputValue = (value?: unknown) => {
    this.jointers.getOutput("output")?.push(value)
  }
}
