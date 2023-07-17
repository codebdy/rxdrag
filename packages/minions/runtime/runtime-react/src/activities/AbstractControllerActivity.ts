import { AbstractActivity } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"
import { IController, IControllerContext } from "../interfaces"

export interface IControllerParam {
  controllerId?: string
}
export interface IControllerConfig {
  param?: IControllerParam
}

export abstract class AbstractControllerActivity<Config extends IControllerConfig = IControllerConfig> extends AbstractActivity<Config> {
  controller: IController
  constructor(meta: INodeDefine<Config>, contexts?: IControllerContext) {
    super(meta, contexts)

    if (!meta.config?.param?.controllerId) {
      throw new Error("ControllerReaction not set controller id")
    }
    const controller = contexts?.controllers?.[meta.config?.param?.controllerId]
    if (!controller) {
      console.log("未找到控制器", contexts?.controllers, meta.config?.param?.controllerId)
      throw new Error("Can not find controller")
    }
    this.controller = controller
  }

  destory = () => {
    //throw new Error("Method not implemented.");
  }
}