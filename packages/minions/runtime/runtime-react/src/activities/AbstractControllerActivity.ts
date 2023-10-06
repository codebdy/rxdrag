import { AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IController, IControllerContext } from "../interfaces"

export interface IControllerParam {
  controllerId?: string
}
export interface IControllerConfig {
  param?: IControllerParam
}

export abstract class AbstractControllerActivity<Config extends IControllerConfig = IControllerConfig> extends AbstractActivity<Config, IControllerContext> {
  protected controller: IController;
  constructor(meta: INodeDefine<Config>, public context?: IControllerContext) {
    super(meta, context)
    const controller = context?.controllers?.[meta.config?.param?.controllerId || ""]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  destroy = () => {
    //throw new Error("Method not implemented.");
  }
}