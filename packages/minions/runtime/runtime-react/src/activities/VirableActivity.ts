import { AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IVariableContext, IVariableController } from "../interfaces"

export interface IVariableConfig {
  variable?: string
}

export class VirableActivity extends AbstractActivity<IVariableConfig, IVariableContext> {
  protected variableController: IVariableController;
  constructor(meta: INodeDefine<IVariableConfig>, public context?: IVariableContext) {
    super(meta, context)
    if (!context?.variableController) {
      throw new Error("Can not find varialble controller")
    }

    this.variableController = context.variableController
  }

  destroy = () => {
    //throw new Error("Method not implemented.");
  }
}