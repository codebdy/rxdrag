import { AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IController, IControllerContext } from "../interfaces"

export interface IControllerConfig {
  controllerId?: string
}

export abstract class AbstractControllerActivity<Config extends IControllerConfig = IControllerConfig> extends AbstractActivity<Config> {
  controller: IController
  constructor(meta: IActivityDefine<Config>, options?: IControllerContext) {
    super(meta, options)

    if (!meta.config?.controllerId) {
      throw new Error("ControllerReaction not set controller id")
    }
    const controller = options?.controllers?.[meta.config?.controllerId]
    if (!controller) {
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  destory = () => {
    //throw new Error("Method not implemented.");
  }
}
