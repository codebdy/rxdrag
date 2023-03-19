import { AbstractReaction, IComponentController, IConfigMeta, IReactionFactoryOptions, IReactionMeta } from "runner/minions"

export interface IControllerReactionConfig extends IConfigMeta {
  prop?: string
  variable?: string
}

export abstract class AbstractControllerReaction extends AbstractReaction<IControllerReactionConfig> {
  controller: IComponentController
  constructor(meta: IReactionMeta<IControllerReactionConfig>, options?: IReactionFactoryOptions) {
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
