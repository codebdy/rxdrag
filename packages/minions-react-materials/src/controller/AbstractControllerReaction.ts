import { AbstractActivity, IController, IActivityFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IActivityDefine } from "@rxdrag/schema"

export interface IControllerReactionConfig extends IConfigMeta {
  prop?: string
  variable?: string
}

export abstract class AbstractControllerReaction extends AbstractActivity<IControllerReactionConfig> {
  controller: IController
  constructor(meta: IActivityDefine<IControllerReactionConfig>, options?: IActivityFactoryOptions) {
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

  destory = () => {}
}
