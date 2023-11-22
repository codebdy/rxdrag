import { AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IController, IReactContext } from "../interfaces"

export interface IControllerConfig {
  controllerId?: string
}

export class ControllerActivity<Config extends IControllerConfig = IControllerConfig> extends AbstractActivity<Config, IReactContext> {
  protected controller: IController;
  constructor(meta: INodeDefine<Config>, public context?: IReactContext) {
    super(meta, context)
    const controller = context?.controllers?.[meta.config?.controllerId || ""]
    if (!controller) {
      throw new Error("Can not find controller:" + meta.config?.controllerId)
    }
    this.controller = controller
  }

  destroy = () => {
    //throw new Error("Method not implemented.");
  }
}