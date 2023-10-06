import { AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IController } from "../interfaces"

export interface IControllerParam {
  controllerId?: string
}
export interface IControllerConfig {
  param?: IControllerParam
}

export abstract class AbstractControllerActivity<Config extends IControllerConfig = IControllerConfig, LogicFlowContext = unknown> extends AbstractActivity<Config, LogicFlowContext> {
  constructor(meta: INodeDefine<Config>, protected controller: IController, public context?: LogicFlowContext) {
    super(meta, context)
  }

  destroy = () => {
    //throw new Error("Method not implemented.");
  }
}