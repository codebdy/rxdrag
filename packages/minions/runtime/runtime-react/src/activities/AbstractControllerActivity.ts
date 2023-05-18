import { SingleInputActivity } from "@rxdrag/minions-runtime"
import { IActivityDefine } from "@rxdrag/minions-schema"
import { IActivityFactoryOptions } from "../controllers"
import { IController } from "../interfaces"

export interface IControllerActivityConfig{
  controllerId: string,
  prop?: string
  variable?: string
}

export abstract class AbstractControllerActivity extends SingleInputActivity<IControllerActivityConfig> {
  controller: IController
  constructor(meta: IActivityDefine<IControllerActivityConfig>, options?: IActivityFactoryOptions) {
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destory = () => {}
}
