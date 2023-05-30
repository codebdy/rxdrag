import { AbstractActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IController, IControllerContext } from "../interfaces"

export interface IControllerConfig {
  controllerId?: string
}

export abstract class AbstractControllerActivity<Config extends IControllerConfig = IControllerConfig> extends AbstractActivity<Config> {
  controller: IController
  constructor(meta: IActivityDefine<Config>, contexts?: IControllerContext) {
    super(meta, contexts)

    if (!meta.config?.controllerId) {
      throw new Error("ControllerReaction not set controller id")
    }
    const controller = contexts?.controllers?.[meta.config?.controllerId]
    if (!controller) {
      console.log("未找到控制器", contexts?.controllers, meta.config?.controllerId)
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  destory = () => {
    //throw new Error("Method not implemented.");
  }
}
